import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { createPoliticianProfileController } from "./createPoliticianProfile";
import { createPoliticianProfileMonitoringController } from "./createPoliticianProfileMonitoring";
import { findPoliticianProfileAdvertisingDetailsController } from "./findPoliticianProfileAdvertisingDetails";
import { findPoliticianProfileCityDetailsController } from "./findPoliticianProfileCityDetails";
import { findPoliticianProfileLegalDetailsController } from "./findPoliticianProfileLegalDetails";
import { findPoliticianProfileMentionDetailsController } from "./findPoliticianProfileMentionDetails";
import { findPoliticianProfileMonitoringListController } from "./findPoliticianProfileMonitoringList";
import { politicianProfileExistsController } from "./politicianProfileExists";
import { fetchAllProfilesEngagementController } from "./fetchAllProfilesEngagement";
import { findPoliticianProfileSocialMediaDataController } from "./findPoliticianProfileSocialMediaData";
import { removeProfileMonitoringController } from "./removeProfileMonitoring";
import { editPoliticianProfileController } from "./editPoliticianProfile";

export async function politicianProfileRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/profile/exists", politicianProfileExistsController);
  app.post("/profile", createPoliticianProfileController);
  app.put("/profile", editPoliticianProfileController);

  app.get(
    "/profile/advertising/:id",
    findPoliticianProfileAdvertisingDetailsController
  );

  app.get(
    "/profile/mentions/:id",
    findPoliticianProfileMentionDetailsController
  );
  app.get("/profile/city/:id", findPoliticianProfileCityDetailsController);
  app.get("/profile/legal/:id", findPoliticianProfileLegalDetailsController);
  app.get("/profile/media/:id", findPoliticianProfileSocialMediaDataController);
  app.get("/profile/engagement", fetchAllProfilesEngagementController);
  app.put("/profile/:id", createPoliticianProfileMonitoringController);
  app.delete("/profile/monitoring/:id", removeProfileMonitoringController);
}

export async function politicianProfileMonitoringListRoutes(
  app: FastifyInstance
) {
  app.addHook("onRequest", verifyJwt);

  app.get("/profile/monitoring", findPoliticianProfileMonitoringListController);
  app.post(
    "/profile/monitoring/:id",
    createPoliticianProfileMonitoringController
  );
}
