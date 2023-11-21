export interface TiktokVideoDataRepository {
  createMany(
    data: {
      id: string;
      title: string;
      description: string;
      url: string;
      duration: string;
      date: Date;
      imgUrl: string;
      viewCount: number;
      commentsCount: number;
      likes: number;
    }[]
  ): Promise<any>;
  findHomeData(data: {
    id: string;
    startDate: Date;
    endDate: Date;
  }): Promise<any>;
  findDetails(data: {
    id: string;
    startDate: Date;
    endDate: Date;
  }): Promise<any>;
}
