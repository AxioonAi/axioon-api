import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { newCreditCardPurchaseController } from "./newCreditCardPurchase";
import { pixPurchaseController } from "./pixPurchase";

export async function purchaseRoutes(app: FastifyInstance) {
	app.post("/pix/:id", { onRequest: [verifyJwt] }, pixPurchaseController);

	app.post(
		"/new-credit-card/:id",
		{ onRequest: [verifyJwt] },
		newCreditCardPurchaseController,
	);
}
