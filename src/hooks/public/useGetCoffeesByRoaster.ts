import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { IRoastersCoffees } from "@/types/roasters";

export function useGetCoffeesByRoaster(selectedRoaster: string) {
  const [coffeeByRoaster, setCoffeeByRoaster] = useState<IRoastersCoffees[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedRoaster) return; // exit early if no roaster provided

    const supabase = createClient();

    const fetchRoasters = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase.rpc("get_coffees_by_roaster", {
          roaster_name: selectedRoaster,
        });

        if (error) throw error;

        if (data && Array.isArray(data)) {
          const typedData = data as IRoastersCoffees[];
          setCoffeeByRoaster(typedData);
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
  }, [selectedRoaster]);

  return { coffeeByRoaster, loading, error };
}
