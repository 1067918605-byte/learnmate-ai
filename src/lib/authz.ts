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

  const supabase = getSupabaseClient();
  if (!supabase) return false;

  try {
    // Query the user_roles table - if it doesn't exist yet, catch the error
    const { data, error } = await supabase
      .from("user_roles" as any)
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      // If the table/policies aren't set up yet, treat as not admin.
      console.warn("user_roles table not available:", error.message);
      return false;
    }

    return (data as any)?.role === "admin";
  } catch (e) {
    console.warn("Error checking admin status:", e);
    return false;
  }
}

