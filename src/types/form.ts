import { z } from "zod";

export const FormSchema = z.object({
  name: z.string(),
  flavour: z.array(z.string()),
  processing: z.string(),
  roast: z.string(),
  origin: z.string(),
});

export type FormData = z.infer<typeof FormSchema>;
