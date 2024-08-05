import { FastifyInstance } from "fastify";
import { getWebsiteListController } from "./getWebsiteList";
import { requestNewWebsiteController } from "./requestNewWebsite";

export async function WebsiteRoutes(app: FastifyInstance) {
  app.get("/website", getWebsiteListController);
  app.post("/website/request", requestNewWebsiteController);
}
