import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { authenticateUserController } from "./authenticateUser";
import { registerUserController } from "./registerUser";
import { updateUserAccountController } from "./updateUserAccount";
import { userProfileController } from "./userProfile";

export async function userRoutes(app: FastifyInstance) {
	app.post("/login", authenticateUserController);
	app.post("/register", registerUserController);
	app.put(
		"/user/profile",
		{ onRequest: [verifyJwt] },
		updateUserAccountController,
	);
	app.get("/user/profile", { onRequest: [verifyJwt] }, userProfileController);
}
