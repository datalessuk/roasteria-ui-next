import { IReviewInput } from "@/types/review";
import { useState } from "react";

export function useSubmitReview() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitReview(review: IReviewInput) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to submit review");

      setLoading(false);
      return data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setLoading(false);
      return null;
    }
  }

  return { submitReview, loading, error };
}
