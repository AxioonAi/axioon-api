import { FastifyInstance } from "fastify";
import { findManyTutorialController } from "./findManyTutorial";

export async function tutorialVideoRoutes(app: FastifyInstance) {
  app.get("/tutorials", findManyTutorialController);
}
