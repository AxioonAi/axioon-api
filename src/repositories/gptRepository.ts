import {
  GptCommentDataInterface,
  GptCommentResponseInterface,
} from "@/@types/databaseInterfaces";

export interface GptRepository {
  commentAnalysis(
    data: GptCommentDataInterface[]
  ): Promise<GptCommentResponseInterface[]>;
}
