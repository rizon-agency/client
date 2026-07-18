import z from "zod";
import { passwordSchema } from "./auth";

export const platformSetupSchema = z.object({
  email: z.email(),
  password: passwordSchema,
});
