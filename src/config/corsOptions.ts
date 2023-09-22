import { CorsOptions } from "cors";
import { env } from "./environment";
const corsMiddleWare = () => {
  const whitelist = [""];
  if (!env.isProduction) {
    whitelist.push("http://localhost:4200");
  }
  const corsOptions: CorsOptions = {
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };
  return corsOptions;
};
export default corsMiddleWare;
