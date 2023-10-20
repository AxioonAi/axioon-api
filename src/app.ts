import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { newsRoutes } from "./http/controller/news/routes";
import { userRoutes } from "./http/controller/user/routes";

export const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(userRoutes);
app.register(newsRoutes);
