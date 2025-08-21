"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ICoffee } from "@/types/coffee";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating"; // keep your working import
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useSubmitReview } from "@/hooks/review/useSubmitReview";
import { toast } from "sonner";
import { ISingleReview } from "@/types/review";
import { useEffect } from "react";

interface ReviewDialogProps {
  coffee: ICoffee | null;
  review?: ISingleReview | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReviewUpdated?: () => void;
}

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating"),
  review: z.string().min(5, "Review must be at least 5 characters"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function ReviewDialog({
  coffee,
  review,
  open,
  onOpenChange,
  onReviewUpdated,
}: ReviewDialogProps) {
  const { submitReview, loading, error } = useSubmitReview();

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 3, review: "" },
  });

  const handleSubmit = async (values: ReviewFormValues) => {
    const result = await submitReview({
      rating: values.rating,
      review_text: values.review,
      coffee_id: coffee?.id ?? 0,
    });
    if (result) {
      toast.success("Review Added ! ", { position: "top-center" });
      onReviewUpdated?.();
      onOpenChange(false);
    } else {
      toast.warning("Sorry something went wrong", { position: "top-center" });
    }
  };

  useEffect(() => {
    if (review) {
      form.reset({
        rating: review.rating,
        review: review.review_text,
      });
    }
  }, [review, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add review for {coffee?.name}</DialogTitle>
          <DialogDescription>
            Share your thoughts about this coffee
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2">
                  <FormLabel>Your Rating</FormLabel>
                  <FormControl>
                    <Rating value={field.value} onValueChange={field.onChange}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <RatingButton
                          key={index}
                          className="text-yellow-500"
                          size={30}
                        />
                      ))}
                    </Rating>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start gap-2">
                  <FormLabel>Your Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What did you love (or not) about this coffee?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-2">
              <Button type="submit">Submit Review</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
