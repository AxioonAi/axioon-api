import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { FindUserNotificationController } from "./FindUserNotification";

export async function notificationRoutes(app: FastifyInstance) {
	app.get(
		"/notification",
		{ onRequest: [verifyJwt] },
		FindUserNotificationController,
	);
}
