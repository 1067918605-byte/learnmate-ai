
-- 1. Create user_roles table with proper enum and RLS
CREATE TYPE public.app_role AS ENUM ('admin', 'student');

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Users can read their own role
CREATE POLICY "Users can read own role"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- 2. Create security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 3. Fix courses table: drop permissive policies, add admin-only policies
DROP POLICY IF EXISTS "Anyone can create courses" ON public.courses;
DROP POLICY IF EXISTS "Anyone can update courses" ON public.courses;

CREATE POLICY "Admins can create courses"
ON public.courses FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update courses"
ON public.courses FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete courses"
ON public.courses FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 4. Fix storage: drop permissive upload policies, restrict to admin
DROP POLICY IF EXISTS "Anyone can upload course videos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload thumbnails" ON storage.objects;

CREATE POLICY "Admins can upload course videos"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'course-videos'
  AND auth.role() = 'authenticated'
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can upload thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'thumbnails'
  AND auth.role() = 'authenticated'
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete uploads"
ON storage.objects FOR DELETE
USING (
  bucket_id IN ('course-videos', 'thumbnails')
  AND auth.role() = 'authenticated'
  AND public.has_role(auth.uid(), 'admin')
);
