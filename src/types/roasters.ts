export interface IRoasters {
  roaster: string | null;
}

export interface IRoastersCoffees {
  id: number;
  created_at: Date;
  description: string;
  url: string;
  roast_level: string;
  processing_method: string;
  single_origin: boolean;
  name: string;
  image_url: string;
  tasting_notes: string[];
  roaster: string;
}

export interface IRoaster {
  id: number;
  name: string;
  about: string;
  url: string;
  image: string;
  location: string;
}
