import { ZodIdParamsSchema } from "@/lib/zod/global";
import { ZodFindPoliticianProfileSocialMediaDataQuerySchema } from "@/lib/zod/politicianProfile";
import { makeFindPoliticianProfileSocialMediaData } from "@/useCase/@factories/politicianProfile/makeFindPoliticianProfileData";
import { FastifyReply, FastifyRequest } from "fastify";
import moment from "moment";

export const findPoliticianProfileSocialMediaDataController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = ZodIdParamsSchema.parse(request.params);
  const { endDate, startDate, facebook, instagram, tiktok, youtube } =
    ZodFindPoliticianProfileSocialMediaDataQuerySchema.parse(request.query);
  const findPoliticianProfileSocialMediaDataUseCase =
    makeFindPoliticianProfileSocialMediaData();
  const data = await findPoliticianProfileSocialMediaDataUseCase.execute({
    profileId: id,
    startDate,
    endDate,
    medias: {
      youtube: youtube === "true",
      tiktok: tiktok === "true",
      instagram: instagram === "true",
      facebook: facebook === "true",
    },
  });

  return reply.status(200).send(data);
};
