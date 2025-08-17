import { useEffect, useState } from "react";
import { ICoffee } from "@/types/coffee";

type CoffeeFilters = {
  tasting_notes?: string[];
  name?: string;
  processing_method?: string;
  origin?: string;
  roast?: string;
};

export function useGetSearch(
  filters?: CoffeeFilters,
  page: number = 1,
  limit: number = 10
) {
  const [coffees, setCoffees] = useState<ICoffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCoffees = async () => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (filters?.name) params.set("name", filters.name);
      if (filters?.processing_method)
        params.set("processing_method", filters.processing_method);
      if (filters?.roast) params.set("roast", filters.roast);
      if (filters?.origin) params.set("origin", filters.origin);
      filters?.tasting_notes?.forEach((note) =>
        params.append("tasting_notes", note)
      );
      params.set("page", page.toString());
      params.set("limit", limit.toString());

      const res = await fetch(`/api/search?${params.toString()}`);
      const json = await res.json();

      if (json.error) {
        setError(json.error);
      } else {
        setCoffees(json.data);
        setTotalPages(json.totalPages);
        setTotal(json.total);
      }

      setLoading(false);
    };

    fetchCoffees();
  }, [filters, page, limit]);

  return { coffees, loading, error, totalPages, total };
}
