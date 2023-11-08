import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import { cityRoutes } from "./http/controller/city/routes";
import { newsRoutes } from "./http/controller/news/routes";
import { scrapeRoutes } from "./http/controller/scrape/routes";
import { userRoutes } from "./http/controller/user/routes";
import { webhookRoutes } from "./http/controller/webhook/routes";
export const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "365d",
  },
});

app.register(userRoutes);
app.register(newsRoutes);
app.register(cityRoutes);
app.register(scrapeRoutes);
app.register(webhookRoutes);
