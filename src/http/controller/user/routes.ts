import { FastifyInstance } from "fastify";
import { authenticateUserController } from "./authenticateUser";
import { registerUserController } from "./registerUser";

export async function userRoutes(app: FastifyInstance) {
  app.post("/login", authenticateUserController);
  app.post("/register", registerUserController);
}
