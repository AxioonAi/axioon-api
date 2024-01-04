import { FastifyInstance } from "fastify";
import { facebookAdsWebhookController } from "./facebookAdsWebhook";
import { facebookCommentsWebhookController } from "./facebookCommentsWebhook";
import { facebookPostsWebhookController } from "./facebookPostsWebhook";
import { facebookProfileWebhookController } from "./facebookProfileWebhook";
import { instagramCommentsWebhookController } from "./instagramCommentsWebhook";
import { instagramMentionCommentsWebhookController } from "./instagramMentionCommentsWebhook";
import { instagramMentionsWebhookController } from "./instagramMentionsWebhook";
import { instagramPostWebhookController } from "./instagramPostWebhook";
import { instagramProfileWebhookController } from "./instagramProfileWebhook";
import { newsWebhookController } from "./newsWebhook";
import { tiktokCommentsWebhookController } from "./tiktokCommentsWebhook";
import { tiktokProfileWebhookController } from "./tiktokProfileWebhook";
import { youtubeChannelWebhookController } from "./youtubeChannelWebhook";
import { youtubeCommentsWebhookController } from "./youtubeCommentsWebhook";
import { youtubeVideoWebhookController } from "./youtubeVideoWebhook";

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
		instagramMentionCommentsWebhookController,
	);
	app.post("/webhook/tiktok", tiktokProfileWebhookController);
	app.post("/webhook/tiktok/comments", tiktokCommentsWebhookController);
	app.post("/webhook/facebook/posts", facebookPostsWebhookController);
	app.post("/webhook/facebook/ads", facebookAdsWebhookController);
	app.post("/webhook/facebook/comments", facebookCommentsWebhookController);
	app.post("/webhook/news", newsWebhookController);
}
