import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { newsWebhookController } from "./newsWebhook";
import { userNewsListController } from "./userNewsList";

export async function newsRoutes(app: FastifyInstance) {
  app.post("/news/webhook", newsWebhookController);
  app.get("/news/user", { onRequest: [verifyJwt] }, userNewsListController);
}
