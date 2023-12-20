import {
  GptCommentDataInterface,
  GptCommentResponseInterface,
  GptMentionDataInterface,
  GptMentionResponseInterface,
  GptNewsDataInterface,
  GptNewsResponseInterface,
} from "@/@types/databaseInterfaces";

export interface GptRepository {
  commentAnalysis(
    data: GptCommentDataInterface[]
  ): Promise<GptCommentResponseInterface[]>;
  mentionAnalysis(
    data: GptMentionDataInterface[]
  ): Promise<GptMentionResponseInterface[]>;
  newsAnalysis(data: GptNewsDataInterface): Promise<GptNewsResponseInterface>;
}
