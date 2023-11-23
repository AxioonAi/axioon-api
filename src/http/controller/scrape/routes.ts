import { FastifyInstance } from "fastify";
import { newsUserListController } from "./newsUserList";
import { userFacebookController } from "./userFacebook";
import { userInstagramController } from "./userInstagram";
import { userNameController } from "./userName";
import { userTikTokController } from "./userTikTok";
import { userYoutubeController } from "./userYoutube";

export async function scrapeRoutes(app: FastifyInstance) {
  app.get("/scrape/instagram", userInstagramController);
  app.get("/scrape/youtube", userYoutubeController);
  app.get("/scrape/tiktok", userTikTokController);
  app.get("/scrape/facebook", userFacebookController);
  app.get("/scrape/name", userNameController);
  app.get("/scrape/news/:id", newsUserListController);
}
