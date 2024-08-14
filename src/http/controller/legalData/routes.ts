import { FastifyInstance } from "fastify";
import { getInitialLegalDataController } from "./getInitialLegalData";

export async function legalDataRoutes(app: FastifyInstance) {
  app.get("/hook/legal-data", getInitialLegalDataController);
}
