import { ISingleReview } from "@/types/review";
import { useState, useEffect, useCallback } from "react";

export function useReview(coffeeId: number) {
  const [review, setReview] = useState<ISingleReview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReview = useCallback(async () => {
    if (!coffeeId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/review?coffee_id=${coffeeId}`);
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Failed to fetch review");
      setReview(json.data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    } finally {
      setLoading(false);
    }
  }, [coffeeId]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  return { review, loading, error, refetch: fetchReview };
}
