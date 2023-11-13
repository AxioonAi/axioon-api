import { FastifyInstance } from "fastify";
import { authenticateUserController } from "./authenticateUser";
import { registerUserController } from "./registerUser";
import { websiteUserListController } from "./websiteUserList";

export async function userRoutes(app: FastifyInstance) {
  app.get("/user/website/:id", websiteUserListController);
  app.post("/login", authenticateUserController);
  app.post("/register", registerUserController);
}
