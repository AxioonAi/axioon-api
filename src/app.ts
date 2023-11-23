import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import { cityRoutes } from "./http/controller/city/routes";
import { politicalGroupRoutes } from "./http/controller/politicalGroup/routes";
import { politicianProfileRoutes } from "./http/controller/politicianProfile/routes";
import { purchaseRoutes } from "./http/controller/purchase/routes";
import { scrapeRoutes } from "./http/controller/scrape/routes";
import { signaturePlanRoutes } from "./http/controller/signaturePlan/routes";
import { userRoutes } from "./http/controller/user/routes";
import { webhookRoutes } from "./http/controller/webhook/routes";
import { fastifyErrorHandler } from "./lib/fastify";
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
app.register(cityRoutes);
app.register(scrapeRoutes);
app.register(webhookRoutes);
app.register(purchaseRoutes);
app.register(signaturePlanRoutes);
app.register(politicalGroupRoutes);
app.register(politicianProfileRoutes);
app.setErrorHandler(fastifyErrorHandler);
