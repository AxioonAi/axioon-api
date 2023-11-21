import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { createPoliticianProfileController } from "./createPoliticianProfile";
import { findPoliticianProfileByCpfController } from "./findPoliticianProfileByCpf";
import { findPoliticianProfileSocialMediaHomeDataController } from "./findPoliticianProfileSocialMediaHomeData";
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
}
