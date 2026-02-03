-- Create storage bucket for course videos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'course-videos',
  'course-videos',
  true,
  2147483648,
  ARRAY['video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime']
);

-- Create storage bucket for thumbnails
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'thumbnails',
  'thumbnails',
  true,
  10485760,
  ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif']
);

-- Allow public read access to course videos
CREATE POLICY "Public can view course videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'course-videos');

-- Allow public read access to thumbnails
CREATE POLICY "Public can view thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'thumbnails');

-- Allow anyone to upload videos (for admin functionality)
CREATE POLICY "Anyone can upload course videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'course-videos');

-- Allow anyone to upload thumbnails
CREATE POLICY "Anyone can upload thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'thumbnails');

-- Create courses table to store video metadata
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER DEFAULT 0,
  lessons INTEGER DEFAULT 1,
  status TEXT DEFAULT 'draft',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on courses
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published courses
CREATE POLICY "Anyone can view published courses"
ON public.courses FOR SELECT
USING (status = 'published');

-- Allow anyone to insert courses (admin functionality)
CREATE POLICY "Anyone can create courses"
ON public.courses FOR INSERT
WITH CHECK (true);

-- Allow anyone to update courses (admin functionality)
CREATE POLICY "Anyone can update courses"
ON public.courses FOR UPDATE
USING (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();