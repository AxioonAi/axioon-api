import { FastifyInstance } from "fastify";
import { getUserChatController } from "./getUserChat";
import { verifyJwt } from "@/http/middleware/verify-jwt";
import { createChatController } from "./createChat";
import { createMessageController } from "./createMessage";

export async function aiChatRoutes(app: FastifyInstance) {
  app.get("/user/chat", { onRequest: [verifyJwt] }, getUserChatController);
  app.post("/user/chat", { onRequest: [verifyJwt] }, createChatController);
  app.post(
    "/user/chat/message",
    { onRequest: [verifyJwt] },
    createMessageController
  );
}
