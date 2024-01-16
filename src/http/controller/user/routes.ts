import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { authenticateUserController } from "./authenticateUser";
import { refreshTokenController } from "./refreshToken";
import { registerUserController } from "./registerUser";
import { updateUserAccountController } from "./updateUserAccount";
import { updateUserPasswordController } from "./updateUserPassword";
import { userProfileController } from "./userProfile";
import { userRecoverPasswordController } from "./userRecoverPassword";
import { userRecoverPasswordCodeController } from "./userRecoverPasswordCode";
import { userSignatureValidationController } from "./userSignatureValidation";

export async function userRoutes(app: FastifyInstance) {
	app.post("/login", authenticateUserController);
	app.post("/register", registerUserController);
	app.patch("/user/token", { onRequest: [verifyJwt] }, refreshTokenController);
	app.put(
		"/user/profile",
		{ onRequest: [verifyJwt] },
		updateUserAccountController,
	);
	app.get("/user/profile", { onRequest: [verifyJwt] }, userProfileController);
	app.put(
		"/user/password",
		{ onRequest: [verifyJwt] },
		updateUserPasswordController,
	);
	app.post("/user/recover-password/code", userRecoverPasswordCodeController);
	app.put("/user/recover-password", userRecoverPasswordController);
	app.get(
		"/user/signature/:id",
		{ onRequest: [verifyJwt] },
		userSignatureValidationController,
	);
}
