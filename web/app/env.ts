import { z } from "zod/v4";

const envSchema = z.object({
  CLIENT_ID: z.string(),
  DOMAIN: z.string(),
  REDIRECT_URI: z.string(),
});

export const env = envSchema.parse(process.env);
