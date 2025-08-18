import { ICoffee } from "@/types/coffee";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export function useCoffee(coffeeId: string) {
  const [coffee, setCoffee] = useState<ICoffee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coffeeId) return;
    const supabase = createClient();
    const fetchCoffee = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("approved_coffees")
          .select("*")
          .eq("id", coffeeId)
          .single();

        setCoffee(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchCoffee();
  }, [coffeeId]);

  return { coffee, loading, error };
}
