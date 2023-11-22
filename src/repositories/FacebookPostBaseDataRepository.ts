export interface FacebookPostBaseDataRepository {
  createMany(
    data: {
      id: string;
      text: string;
      url: string;
      date: string;
      likes: string;
      shares: string;
      comments: string;
      thumbnail: string;
      politician_id: string;
    }[]
  ): Promise<any>;
  findDetails(data: {
    id: string;
    startDate: Date;
    endDate: Date;
  }): Promise<any>;
}
