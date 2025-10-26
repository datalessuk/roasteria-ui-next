import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export function useUpdateUserName() {
  const [userLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUserName = async (newUserName: string) => {
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) {
      setError(userError.message);
      setLoading(false);
      return;
    }
    if (!user) {
      setError("No logged-in user");
      setLoading(false);
      return;
    }

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update({ username: newUserName })
      .eq("id", user.id)
      .select()
      .single();

    if (updateError) {
      setError(updateError.message);
    }

    setLoading(false);
    return data;
  };

  return { updateUserName, userLoading, error };
}
