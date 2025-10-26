import { createClient } from "@/utils/supabase/server";

export async function getPublicProfile(username: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, created_at, drank, to_try, reviewed")
    .eq("username", username)
    .single();

  return { data, error };
}
