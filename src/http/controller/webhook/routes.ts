import { FastifyInstance } from "fastify";
import { facebookAdsWebhookController } from "./facebookAdsWebhook";
import { facebookCommentsWebhookController } from "./facebookCommentsWebhook";
import { facebookPostsWebhookController } from "./facebookPostsWebhook";
import { facebookProfileWebhookController } from "./facebookProfileWebhook";
import { instagramCommentsWebhookController } from "./instagramCommentsWebhook";
import { instagramHashtagMentionsWebhookController } from "./instagramHashtagMentionsWebhook";
import { instagramPostWebhookController } from "./instagramPostWebhook";
import { instagramProfileWebhookController } from "./instagramProfileWebhook";
import { legalWebhookController } from "./legalWebhook";
import { newsWebhookController } from "./newsWebhook";
import { tiktokCommentsWebhookController } from "./tiktokCommentsWebhook";
import { tiktokProfileWebhookController } from "./tiktokProfileWebhook";
import { youtubeChannelWebhookController } from "./youtubeChannelWebhook";
import { youtubeCommentsWebhookController } from "./youtubeCommentsWebhook";
import { youtubeVideoWebhookController } from "./youtubeVideoWebhook";
import { instagramMentionsWebhookController } from "./instagramMentionsWebhook";
import { instagramMentionCommentsWebhookController } from "./instagramMentionCommentsWebhook";
import { instagramHashtagMentionCommentsWebhookController } from "./instagramHashtagMentionsCommentsWebhook";
import { instagramEngagerWebhookController } from "./instagramEngagerWebhook";
import { tiktokEngagerWebhookController } from "./tiktokEngagerWebhook";
import { tiktokHashtagMentionsWebhookController } from "./tiktokHashtagMentionsWebhook";
import { tiktokHashtagMentionsCommentWebhookController } from "./tiktokHashtagMentionsCommentWebhook";

export async function webhookRoutes(app: FastifyInstance) {
  app.post("/webhook/youtube/video", youtubeVideoWebhookController);
  app.post("/webhook/youtube/comments", youtubeCommentsWebhookController);
  app.post("/webhook/youtube/channel", youtubeChannelWebhookController);
  app.post("/webhook/facebook/profile", facebookProfileWebhookController);
  app.post("/webhook/instagram/profile", instagramProfileWebhookController);
  app.post("/webhook/instagram/comments", instagramCommentsWebhookController);
  app.post("/webhook/instagram/posts", instagramPostWebhookController);
  app.post("/webhook/instagram/mentions", instagramMentionsWebhookController);
  app.post(
    "/webhook/instagram/mentions/comments",
    instagramMentionCommentsWebhookController
  );
  app.post(
    "/webhook/instagram/hashtag/mentions",
    instagramHashtagMentionsWebhookController
  );

  app.post(
    "/webhook/instagram/hashtag/mentions/comments",
    instagramHashtagMentionCommentsWebhookController
  );
  app.post(
    "/webhook/tiktok/hashtag/mentions",
    tiktokHashtagMentionsWebhookController
  );

  app.post(
    "/webhook/tiktok/hashtag/mentions/comments",
    tiktokHashtagMentionsCommentWebhookController
  );
  app.post("/webhook/instagram/engagers", instagramEngagerWebhookController);
  app.post("/webhook/tiktok/engagers", tiktokEngagerWebhookController);
  app.post("/webhook/tiktok", tiktokProfileWebhookController);
  app.post("/webhook/tiktok/comments", tiktokCommentsWebhookController);
  app.post("/webhook/facebook/posts", facebookPostsWebhookController);
  app.post("/webhook/facebook/ads", facebookAdsWebhookController);
  app.post("/webhook/facebook/comments", facebookCommentsWebhookController);
  app.post("/webhook/news", newsWebhookController);
  app.post("/webhook/legal", legalWebhookController);
}
