export interface TiktokCommentDataRepository {
  createMany(data: any[]): Promise<any>;
}
