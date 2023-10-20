import { FastifyInstance } from "fastify";
import { websiteUserListController } from "./websiteUserList";

export async function userRoutes(app: FastifyInstance) {
  app.get("/user/website/:id", websiteUserListController);
}
