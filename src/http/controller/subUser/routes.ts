import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { authenticateSubUserController } from "./authenticateSubUser";
import { createSubUserController } from "./createSubUser";
import { refreshTokenController } from "./refreshToken";
import { subUserListController } from "./subUserList";
import { updateSubUserController } from "./updateSubUser";

export async function subUserRoutes(app: FastifyInstance) {
	app.patch("/sub-user/token", refreshTokenController);
	app.post("/sub-user/login", authenticateSubUserController);
	app.get("/sub-user", { onRequest: [verifyJwt] }, subUserListController);
	app.put("/sub-user/:id", { onRequest: [verifyJwt] }, updateSubUserController);
	app.post(
		"/sub-user/create",
		{ onRequest: [verifyJwt] },
		createSubUserController,
	);
}
