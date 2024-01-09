import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { authenticateUserController } from "./authenticateUser";
import { refreshTokenController } from "./refreshToken";
import { registerUserController } from "./registerUser";
import { updateUserAccountController } from "./updateUserAccount";
import { userProfileController } from "./userProfile";

export async function userRoutes(app: FastifyInstance) {
	app.post("/login", authenticateUserController);
	app.post("/register", registerUserController);
	app.patch("/user/token", refreshTokenController);
	app.put(
		"/user/profile",
		{ onRequest: [verifyJwt] },
		updateUserAccountController,
	);
	app.get("/user/profile", { onRequest: [verifyJwt] }, userProfileController);
	// app.put(
	// 	"/user/password",
	// 	{ onRequest: [verifyJwt] },
	// 	updateUserPasswordController,
	// );
	// app.post("/user/recover-password/code", userRecoverPasswordCodeController);
	// app.put("/user/recover-password", userRecoverPasswordController);
}
