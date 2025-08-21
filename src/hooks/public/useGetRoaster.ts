import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { IRoaster } from "@/types/roasters";

export function useGetRoaster(roasterName: string) {
  const [roaster, setRoaster] = useState<IRoaster | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const fetchRoaster = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("roasters")
        .select("id, name, about, url, image, location")
        .eq("name", roasterName.trim())
        .single();

      if (error) {
        setError(error.message);
        setRoaster(null);
      } else if (data) {
        setRoaster(data as IRoaster);
      }

      setLoading(false);
    };

    fetchRoaster();
  }, [roasterName]);

  return { roaster, loading, error };
}
