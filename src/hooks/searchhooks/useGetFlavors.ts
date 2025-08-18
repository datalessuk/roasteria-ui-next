import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

// Type for the flavor data from Supabase
interface FlavorData {
  flavor: string;
}

export function useUniqueFlavors() {
  const [flavors, setFlavors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.rpc("get_unique_flavors").then(({ data, error }) => {
      if (error) throw error;
      const seen = new Set<string>();
      const unique =
        (data as FlavorData[])
          ?.filter((item: FlavorData) => {
            const lower = item.flavor?.toLowerCase().trim();
            if (!lower || seen.has(lower)) return false;
            seen.add(lower);
            return true;
          })
          .map((item: FlavorData) => item.flavor.trim()) || [];

      setFlavors(unique);
    });
  }, []);

  return { flavors, loading, error };
}
