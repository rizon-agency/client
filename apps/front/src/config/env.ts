import { z } from "zod";
import { config } from "dotenv";

config({
  path: "../../.env",
});

const schema = z.object({
  NEXT_PUBLIC_CLIENT_URL: z.url(),
});

export const env = schema.parse({
  NEXT_PUBLIC_CLIENT_URL: process.env["NEXT_PUBLIC_CLIENT_URL"],
});
