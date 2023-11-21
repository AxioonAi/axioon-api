import { FastifyInstance } from "fastify";
import { facebookWebhookController } from "./facebookWebhook";
import { instagramCommentsWebhookController } from "./instagramCommentsWebhook";
import { instagramMentionsWebhookController } from "./instagramMentionsWebhook";
import { instagramProfileWebhookController } from "./instagramProfileWebhook";
import { tiktokProfileWebhookController } from "./tiktokProfileWebhook";
import { youtubeWebhookController } from "./youtubeWebhook";

export async function webhookRoutes(app: FastifyInstance) {
  app.post("/webhook/youtube", youtubeWebhookController);
  app.post("/webhook/facebook", facebookWebhookController);
  app.post("/webhook/instagram/profile", instagramProfileWebhookController);
  app.post("/webhook/instagram/comments", instagramCommentsWebhookController);
  app.post("/webhook/instagram/mentions", instagramMentionsWebhookController);
  app.post("/webhook/tiktok", tiktokProfileWebhookController);
}
