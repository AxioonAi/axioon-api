import { FastifyInstance } from "fastify";
import { getElectoralHistoryController } from "./getElectoralHistory";
import { verifyJwt } from "@/http/middleware/verify-jwt";
import { getProfileElectoralYearsController } from "./getProfileElectoralYears";

export async function ElectoralHistoryRoutes(app: FastifyInstance) {
  app.get(
    "/profile/electoral-history/:id",
    { onRequest: [verifyJwt] },
    getElectoralHistoryController
  );
  app.get(
    "/profile/electoral-years/:id",
    { onRequest: [verifyJwt] },
    getProfileElectoralYearsController
  );
}
