import fastifyCors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { env } from "./env";
import { notificationRoutes } from "./http/controller/notification/routes";
import { politicalGroupRoutes } from "./http/controller/politicalGroup/routes";
import {
	politicianProfileMonitoringListRoutes,
	politicianProfileRoutes,
} from "./http/controller/politicianProfile/routes";
import { purchaseRoutes } from "./http/controller/purchase/routes";
import { scrapeRoutes } from "./http/controller/scrape/routes";
import { signaturePlanRoutes } from "./http/controller/signaturePlan/routes";
import { subUserRoutes } from "./http/controller/subUser/routes";
import { tutorialVideoRoutes } from "./http/controller/tutorialVideo/routes";
import { userRoutes } from "./http/controller/user/routes";
import { webhookRoutes } from "./http/controller/webhook/routes";
import { fastifyErrorHandler } from "./lib/fastify";
import { prisma } from "./lib/prisma";
export const app = fastify();

app.register(fastifyCors, {
	origin: "*",
});

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: "refreshToken",
		signed: false,
	},
	sign: {
		expiresIn: "365d",
	},
});

app.register(userRoutes); // TESTADO
app.register(scrapeRoutes); // TESTADO
app.register(subUserRoutes);
app.register(webhookRoutes);
app.register(purchaseRoutes);
app.register(notificationRoutes); // TESTADO
app.register(tutorialVideoRoutes); // TESTADO
app.register(signaturePlanRoutes); // TESTADO
app.register(politicalGroupRoutes); // TESTADO
app.register(politicianProfileRoutes);
app.setErrorHandler(fastifyErrorHandler); // TESTADO
app.register(politicianProfileMonitoringListRoutes);

app.get("/dorner", async (request, reply) => {
	await prisma.facebookPostBaseData.deleteMany({
		where: {
			politician_id: "91ce803a-2df5-4f14-b386-54927dd12cbc",
		},
	});
	// await prisma.tiktokBaseData.deleteMany({
	// 	where: {
	// 		politician_id: "91ce803a-2df5-4f14-b386-54927dd12cbc",
	// 	},
	// });
	// await prisma.instagramBaseData.deleteMany({
	// 	where: {
	// 		politician_id: "91ce803a-2df5-4f14-b386-54927dd12cbc",
	// 	},
	// });
	// await prisma.youtubeBaseData.deleteMany({
	// 	where: {
	// 		politician_id: "91ce803a-2df5-4f14-b386-54927dd12cbc",
	// 	},
	// });
	// await prisma.youtubeVideoData.deleteMany({
	// 	where: {
	// 		politician_id: "91ce803a-2df5-4f14-b386-54927dd12cbc",
	// 	},
	// });

	reply.send("foi");
});
