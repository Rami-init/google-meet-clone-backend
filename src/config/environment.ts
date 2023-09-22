import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();
const isProduction = process.env.NODE_ENV === "production";

const EnvironmentConfigSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.number().default(8000),
  DATABASE_URL: z
    .string()
    .nonempty()
    .default(() =>
      isProduction ? "" : "postgres://postgres:postgres@localhost:5432/test"
    ),
  JWT_SECRET: z
    .string()
    .nonempty()
    .default(() => (isProduction ? "" : "secret")),
  JWT_EXPIRES_IN: z
    .string()
    .nonempty()
    .default(() => (isProduction ? "" : "1d")),
  REDIS_URL: z
    .string()
    .nonempty()
    .default(() => (isProduction ? "" : "redis://localhost:6379")),
});
type TEnvironmentConfig = z.infer<typeof EnvironmentConfigSchema> & {
  isProduction: boolean;
};
const environmentConfig = EnvironmentConfigSchema.parse(process.env);
export const env: TEnvironmentConfig = {
  ...environmentConfig,
  get isProduction() {
    return this.NODE_ENV === "production";
  },
} as const;
