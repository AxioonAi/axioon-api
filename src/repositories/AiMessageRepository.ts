export interface AiMessageRepository {
  create(data: {
    message: string;
    type: "USER" | "AI";
    chatId: string;
  }): Promise<void>;
}
