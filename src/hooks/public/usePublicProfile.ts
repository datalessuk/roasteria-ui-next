import { createClient } from "@/utils/supabase/client";
import { IProfile } from "@/types/profile";
import { useEffect, useState } from "react";

export function usePublicProfile(userName: string) {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchProfile() {
      if (!userName) return;

      const { data, error } = await supabase
        .from("public_profiles")
        .select("*")
        .eq("username", userName)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      }

      setProfile(data);
      setLoading(false);
    }

    fetchProfile();
  }, [userName]);

  return { profile, loading };
}
