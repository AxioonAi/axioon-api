import { FastifyInstance } from "fastify";
import { userFacebookController } from "./userFacebook";
import { userInstagramController } from "./userInstagram";
import { userTikTokController } from "./userTikTok";
import { userYoutubeController } from "./userYoutube";

export async function scrapeRoutes(app: FastifyInstance) {
  app.get("/scrape/instagram", userInstagramController);
  app.get("/scrape/youtube", userYoutubeController);
  app.get("/scrape/tiktok", userTikTokController);
  app.get("/scrape/facebook", userFacebookController);
}
