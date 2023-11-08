import { FastifyInstance } from "fastify";
import { youtubeWebhookController } from "./youtubeWebhook";

export async function webhookRoutes(app: FastifyInstance) {
  app.post("/webhook/youtube", youtubeWebhookController);
}
