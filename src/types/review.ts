export interface IReviewFormValues {
  rating: number;
  review: string;
}

export interface IReviewInput {
  rating: number;
  review_text: string;
  coffee_id: number;
}

export interface ISingleReview {
  coffee_id: number;
  rating: number;
  review_text: string;
}
