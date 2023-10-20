import { FastifyInstance } from "fastify";
import { newsWebhookController } from "./newsWebhook";

export async function newsRoutes(app: FastifyInstance) {
  app.post("/news/webhook", newsWebhookController);
}
