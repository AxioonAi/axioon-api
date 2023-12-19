import { GptCommentDataInterface } from "@/@types/databaseInterfaces";
import { SexType } from "@prisma/client";
import { GptRepository } from "../gptRepository";

export class GptProductionRepository implements GptRepository {
  async commentAnalysis(data: GptCommentDataInterface[]) {
    const finalData = [];
    for (const item of data) {
      finalData.push({
        id: item.id,
        authorGender: SexType.FEMALE,
        sentimentAnalysis: Math.abs(
          Math.floor(Math.random() * (100 - 1000) + 100)
        ),
      });
    }

    return finalData;
  }
}
