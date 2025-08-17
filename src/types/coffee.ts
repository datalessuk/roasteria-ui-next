export interface ICoffeePublic {
  id: number;
  name: string;
  description: string;
  url: string;
  roast_level: string;
  processing_method: string;
  single_origin: boolean;
  image_url: string;
  tasting_notes: string[];
}

export interface ICoffee {
  id: number;
  name: string;
  description: string;
  url: string;
  roast_level: string;
  processing_method: string;
  tasting_notes: string[];
  single_origin: boolean;
  user_id: string;
  image_url: string;
  origin: string;
  tasting_notes_array?: string[];
}
