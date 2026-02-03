import { getSupabaseClient } from "@/integrations/supabase/client";

export async function getSessionUser() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw error;
  return session?.user ?? null;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getSessionUser();
  if (!user) return false;

  // Expected schema:
  // user_roles(user_id uuid primary key, role text)
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    // If the table/policies aren't set up yet, treat as not admin.
    return false;
  }

  return data?.role === "admin";
}

