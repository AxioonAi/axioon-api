import { verifyJwt } from "@/http/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
import { createPoliticianProfileController } from "./createPoliticianProfile";
import { findPoliticianProfileByCpfController } from "./findPoliticianProfileByCpf";

export async function politicianProfileRoutes(app: FastifyInstance) {
  app.get("/profile/cpf/:id", findPoliticianProfileByCpfController);
  app.post(
    "/profile",
    { onRequest: [verifyJwt] },
    createPoliticianProfileController
  );
}
