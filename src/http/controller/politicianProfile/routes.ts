import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { createPoliticianProfileController } from "./createPoliticianProfile";
import { findPoliticianProfileAdvertisingDetailsController } from "./findPoliticianProfileAdvertisingDetails";
import { findPoliticianProfileByCpfController } from "./findPoliticianProfileByCpf";
import { findPoliticianProfileFacebookDetailsController } from "./findPoliticianProfileFacebookDetails";
import { findPoliticianProfileInstagramDetailsController } from "./findPoliticianProfileInstagramDetails";
import { findPoliticianProfileSocialMediaHomeDataController } from "./findPoliticianProfileSocialMediaHomeData";
import { findPoliticianProfileTiktokDetailsController } from "./findPoliticianProfileTiktokDetails";
import { findPoliticianProfileYoutubeDetailsController } from "./findPoliticianProfileYoutubeDetails";

export async function politicianProfileRoutes(app: FastifyInstance) {
  app.get("/profile/cpf/:id", findPoliticianProfileByCpfController);
  app.post(
    "/profile",
    { onRequest: [verifyJwt] },
    createPoliticianProfileController
  );
  app.get(
    "/profile/youtube/:id",
    findPoliticianProfileYoutubeDetailsController
  );
  app.get(
    "/profile/social/home/:id",
    findPoliticianProfileSocialMediaHomeDataController
  );

  app.get(
    "/profile/tiktok/:id",
    { onRequest: [verifyJwt] },
    findPoliticianProfileTiktokDetailsController
  );

  app.get(
    "/profile/facebook/:id",
    findPoliticianProfileFacebookDetailsController
  );

  app.get(
    "/profile/advertising/:id",
    findPoliticianProfileAdvertisingDetailsController
  );
  app.get(
    "/profile/instagram/:id",
    findPoliticianProfileInstagramDetailsController
  );
}
