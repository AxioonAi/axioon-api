import { FastifyInstance } from "fastify";
import { findManyPoliticalGroupController } from "./findManyPoliticalGroup";

export async function politicalGroupRoutes(app: FastifyInstance) {
	app.get("/political-group", findManyPoliticalGroupController);
}
