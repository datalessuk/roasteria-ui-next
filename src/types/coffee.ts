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
