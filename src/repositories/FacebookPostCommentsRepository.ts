export interface FacebookPostCommentsRepository {
  createMany(data: any[]): Promise<any>;
}
