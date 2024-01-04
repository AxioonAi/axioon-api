import { FastifyInstance } from "fastify";
import { findManySignaturePlansController } from "./findManySignaturePlans";

export async function signaturePlanRoutes(app: FastifyInstance) {
	app.get("/plans", findManySignaturePlansController);
}
