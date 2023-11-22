export interface YoutubeVideoDataRepository {
  createMany(
    data: {
      id: string;
      videos: {
        title: string;
        description: string;
        url: string;
        duration: string;
        date: Date;
        imgUrl: string;
        viewCount: number;
        commentsCount: number;
        likes: number;
      }[];
    }[]
  ): Promise<void>;
  findHomeData(data: {
    id: string;
    startDate: Date;
    endDate: Date;
  }): Promise<any>;
}
