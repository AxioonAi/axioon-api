import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import { aiChatRoutes } from "./http/controller/aiChat/routes";
import { ElectoralHistoryRoutes } from "./http/controller/electoralHistory/routes";
import { hashtagRoutes } from "./http/controller/hashtag/routes";
import { legalDataRoutes } from "./http/controller/legalData/routes";
import { notificationRoutes } from "./http/controller/notification/routes";
import { politicalGroupRoutes } from "./http/controller/politicalGroup/routes";
import {
  politicianProfileMonitoringListRoutes,
  politicianProfileRoutes,
} from "./http/controller/politicianProfile/routes";
import { purchaseRoutes } from "./http/controller/purchase/routes";
import { scrapeRoutes } from "./http/controller/scrape/routes";
import { signaturePlanRoutes } from "./http/controller/signaturePlan/routes";
import { subUserRoutes } from "./http/controller/subUser/routes";
import { tutorialVideoRoutes } from "./http/controller/tutorialVideo/routes";
import { userRoutes } from "./http/controller/user/routes";
import { webhookRoutes } from "./http/controller/webhook/routes";
import { WebsiteRoutes } from "./http/controller/website/routes";
import { fastifyErrorHandler } from "./lib/fastify";
import { prisma } from "./lib/prisma";
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

app.register(legalDataRoutes);
app.register(hashtagRoutes);
app.register(userRoutes);
app.register(scrapeRoutes);
app.register(subUserRoutes);
app.register(webhookRoutes);
app.register(purchaseRoutes);
app.register(aiChatRoutes);
app.register(notificationRoutes);
app.register(tutorialVideoRoutes);
app.register(signaturePlanRoutes);
app.register(politicalGroupRoutes);
app.register(politicianProfileRoutes);
app.register(ElectoralHistoryRoutes);
app.setErrorHandler(fastifyErrorHandler);
app.register(WebsiteRoutes);
app.register(politicianProfileMonitoringListRoutes);

app.get("/test", async (request, reply) => {
  await prisma.website.updateMany({
    data: {
      state_capital_id: "85d08d06-871e-4772-883c-4e065b1c4922",
    },
  });

  await prisma.politicianProfile.updateMany({
    data: {
      city_id: "85d08d06-871e-4772-883c-4e065b1c4922",
    },
  });
});
