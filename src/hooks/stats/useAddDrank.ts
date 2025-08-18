import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { IProfile } from "@/types/profile";

export function useAddDrank() {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const fetchProfile = async () => {
        setLoading(true);
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
        setError(userError.message);
        setLoading(false);
        return;
      }

      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

    }
  });
}
