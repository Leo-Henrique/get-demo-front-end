import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string(),
  API_BASE_URL: z.string().url(),
});

const parsedEnv = schema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(parsedEnv.error.flatten().fieldErrors);

  throw new Error("Invalid environment variables.");
}

export const env = parsedEnv.data;
