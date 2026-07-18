import z from "zod";

export const createSignedUrlSchema = z.object({
  mimeType: z.string().nonempty().max(255),
  name: z.string().min(3).max(255).includes("."),
  sizeBytes: z.number().int().positive(),
});
