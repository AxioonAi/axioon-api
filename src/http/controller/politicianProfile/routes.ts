import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { createPoliticianProfileController } from "./createPoliticianProfile";
import { findPoliticianProfileAdvertisingDetailsController } from "./findPoliticianProfileAdvertisingDetails";
import { findPoliticianProfileCityDetailsController } from "./findPoliticianProfileCityDetails";
import { findPoliticianProfileFacebookDetailsController } from "./findPoliticianProfileFacebookDetails";
import { findPoliticianProfileInstagramDetailsController } from "./findPoliticianProfileInstagramDetails";
import { findPoliticianProfileMentionDetailsController } from "./findPoliticianProfileMentionDetails";
import { findPoliticianProfileMonitoringListController } from "./findPoliticianProfileMonitoringList";
import { findPoliticianProfileSocialMediaHomeDataController } from "./findPoliticianProfileSocialMediaHomeData";
import { findPoliticianProfileTiktokDetailsController } from "./findPoliticianProfileTiktokDetails";
import { findPoliticianProfileYoutubeDetailsController } from "./findPoliticianProfileYoutubeDetails";
import { findPoliticianProfileLegalDetailsController } from "./findPoliticianProfileLegalDetails";
import { politicianProfileExistsController } from "./politicianProfileExists";
import { createPoliticianProfileMonitoringController } from "./createPoliticianProfileMonitoring";

export async function politicianProfileRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJwt);
	// app.addHook("onRequest", verifyAccessMiddleware);

	app.post("/profile/exists", politicianProfileExistsController);
	app.post("/profile", createPoliticianProfileController);
	app.get(
		"/profile/youtube/:id",
		findPoliticianProfileYoutubeDetailsController,
	);
	app.get(
		"/profile/social/home/:id",
		findPoliticianProfileSocialMediaHomeDataController,
	);
	app.get("/profile/tiktok/:id", findPoliticianProfileTiktokDetailsController);

	app.get(
		"/profile/facebook/:id",
		findPoliticianProfileFacebookDetailsController,
	);

	app.get(
		"/profile/advertising/:id",
		findPoliticianProfileAdvertisingDetailsController,
	);
	app.get(
		"/profile/instagram/:id",
		findPoliticianProfileInstagramDetailsController,
	);
	app.get(
		"/profile/mentions/:id",
		findPoliticianProfileMentionDetailsController,
	);
	app.get("/profile/city/:id", findPoliticianProfileCityDetailsController);
	app.get("/profile/legal/:id", findPoliticianProfileLegalDetailsController);
}

export async function politicianProfileMonitoringListRoutes(
	app: FastifyInstance,
) {
	app.addHook("onRequest", verifyJwt);

	app.get("/profile/monitoring", findPoliticianProfileMonitoringListController);
	app.post(
		"/profile/monitoring/:id",
		createPoliticianProfileMonitoringController,
	);
}
