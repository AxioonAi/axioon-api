import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { cityStatisticsController } from "./cityStatistics";

export async function cityRoutes(app: FastifyInstance) {
	app.get(
		"/city/statistics/:id",
		{ onRequest: [verifyJwt] },
		cityStatisticsController,
	);
}
