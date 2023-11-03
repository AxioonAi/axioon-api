import { FastifyInstance } from "fastify";
import { authenticateUserController } from "./authenticateUser";
import { websiteUserListController } from "./websiteUserList";

export async function userRoutes(app: FastifyInstance) {
  app.get("/user/website/:id", websiteUserListController);
  app.post("/user/authenticate", authenticateUserController);
}
