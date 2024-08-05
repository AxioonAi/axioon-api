import { FastifyInstance } from "fastify";
import { cpfListController } from "./cpfList";
import { findProfileWithoutFacebookController } from "./findProfileWithoutFacebook";
import { findProfileWithoutInstagramController } from "./findProfileWithoutInstagram";
import { findProfileWithoutLegalController } from "./findProfileWithoutLegal";
import { findProfileWithoutNewsController } from "./findProfileWithoutNews";
import { findProfileWithoutTiktokController } from "./findProfileWithoutTiktok";
import { findProfileWithoutYoutubeController } from "./findProfileWithoutYoutube";
import { newsUserListController } from "./newsUserList";
import { userFacebookController } from "./userFacebook";
import { userInstagramController } from "./userInstagram";
import { userNameController } from "./userName";
import { userTikTokController } from "./userTikTok";
import { userYoutubeController } from "./userYoutube";
import { findInstagramEngagerController } from "./findInstagramEngager";
import { findTiktokEngagerController } from "./findTiktokEngager";

export async function scrapeRoutes(app: FastifyInstance) {
  app.get("/scrape/instagram", userInstagramController);
  app.get("/scrape/youtube", userYoutubeController);
  app.get("/scrape/tiktok", userTikTokController);
  app.get("/scrape/facebook", userFacebookController);
  app.get("/scrape/name", userNameController);
  app.get("/scrape/cpf", cpfListController);
  app.get("/scrape/news/:id", newsUserListController);
  app.get("/scrape/instagram/engagers", findInstagramEngagerController);
  app.get("/scrape/tiktok/engagers", findTiktokEngagerController);
  app.get("/scrape/without/instagram", findProfileWithoutInstagramController);
  app.get("/scrape/without/facebook", findProfileWithoutFacebookController);
  app.get("/scrape/without/tiktok", findProfileWithoutTiktokController);
  app.get("/scrape/without/youtube", findProfileWithoutYoutubeController);
  app.get("/scrape/without/legal", findProfileWithoutLegalController);
  app.get("/scrape/without/news/:id", findProfileWithoutNewsController);
}
