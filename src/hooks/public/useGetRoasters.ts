import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface RoasterResponse {
  roaster: string;
}

export function useGetRoasters() {
  const [roasters, setRoasters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchRoasters = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase.rpc("get_unique_roasters");

        if (error) throw error;

        if (data && Array.isArray(data)) {
          const typedData = data as RoasterResponse[];
          setRoasters(typedData.map((row) => row.roaster));
        }
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch roasters"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRoasters();
  }, []);

  return { roasters, loading, error };
}
