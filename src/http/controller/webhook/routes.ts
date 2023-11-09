import { FastifyInstance } from "fastify";
import { facebookWebhookController } from "./facebookWebhook";
import { instagramCommentsController } from "./instagramComments";
import { instagramMentionsController } from "./instagramMentions";
import { youtubeWebhookController } from "./youtubeWebhook";

export async function webhookRoutes(app: FastifyInstance) {
  app.post("/webhook/youtube", youtubeWebhookController);
  app.post("/webhook/facebook", facebookWebhookController);
  app.post("/webhook/instagram/comments", instagramCommentsController);
  app.post("/webhook/instagram/mentions", instagramMentionsController);
}
