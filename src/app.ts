import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
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
import { fastifyErrorHandler } from "./lib/fastify";
import { WebsiteRoutes } from "./http/controller/website/routes";
import { hashtagRoutes } from "./http/controller/hashtag/routes";
import { ElectoralHistoryRoutes } from "./http/controller/electoralHistory/routes";
import { prisma } from "./lib/prisma";
import {
  InstagramEngager,
  InstagramMention,
  InstagramMentionComment,
  InstagramPostComment,
  Prisma,
  TiktokCommentData,
  TiktokEngager,
} from "@prisma/client";
import { randomUUID } from "crypto";
import { aiChatRoutes } from "./http/controller/aiChat/routes";
import { legalDataRoutes } from "./http/controller/legalData/routes";
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

app.get("/create-engagers", async (request, reply) => {
  const mentions = await prisma.instagramMention.findMany({
    where: {
      instagramEngagerId: null,
    },
  });

  const engagers: Prisma.InstagramEngagerUncheckedCreateInput[] = [];
  const mentionsToUpdate: InstagramMention[] = [];
  for (const mention of mentions) {
    const engagerExists = engagers.find(
      (engager) => engager.username === mention.ownerUsername
    );

    if (!engagerExists) {
      const id = randomUUID();
      engagers.push({
        username: mention.ownerUsername,
        followers: 0,
        id,
        name: mention.ownerUsername,
      });

      mentionsToUpdate.push({
        ...mention,
        instagramEngagerId: id,
      });
    } else {
      mentionsToUpdate.push({
        ...mention,
        instagramEngagerId: engagerExists.id || null,
      });
    }
  }

  await prisma.instagramEngager.createMany({
    data: engagers,
  });

  mentionsToUpdate.forEach(async (mention) => {
    await prisma.instagramMention.update({
      where: {
        id: mention.id,
      },
      data: {
        instagramEngagerId: mention.instagramEngagerId,
      },
    });
  });

  return;
});
