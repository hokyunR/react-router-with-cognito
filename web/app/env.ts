import { z } from "zod/v4";

const envSchema = z.object({
  DOMAIN: z.string(),
});

export const env = envSchema.parse(process.env);
