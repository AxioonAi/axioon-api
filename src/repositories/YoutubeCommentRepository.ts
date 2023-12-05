export interface YoutubeCommentsRepository {
  createMany(data: any[]): Promise<any>;
}
