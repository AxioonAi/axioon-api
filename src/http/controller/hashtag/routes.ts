import { FastifyInstance } from "fastify";
import { getHashtagListController } from "./getHashtagList";
import { verifyJwt } from "@/http/middleware/verify-jwt";
import { createHashtagController } from "./createHashtag";
import { findHashtagMentionsController } from "./findHashtagMentions";

export async function hashtagRoutes(app: FastifyInstance) {
  app.get("/hashtag", { onRequest: [verifyJwt] }, getHashtagListController);
  app.post("/hashtag", { onRequest: [verifyJwt] }, createHashtagController);
  app.get(
    "/hashtag/mentions",
    { onRequest: [verifyJwt] },
    findHashtagMentionsController
  );
}
