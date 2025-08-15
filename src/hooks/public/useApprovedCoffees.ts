import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import type { ICoffeePublic } from "@/types/coffee";

export function useApprovedCoffees() {
  const [coffees, setCoffees] = useState<ICoffeePublic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchCoffees = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("approved_coffees")
        .select(
          "id, name, description, roast_level, processing_method, single_origin, tasting_notes, image_url, url"
        );

      if (error) {
        setError(error.message);
      } else if (data) {
        setCoffees(data as ICoffeePublic[]);
      }

      setLoading(false);
    };

    fetchCoffees();
  }, []);

  return { coffees, loading, error };
}
