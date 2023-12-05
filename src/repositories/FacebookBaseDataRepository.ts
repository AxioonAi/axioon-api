export interface FacebookBaseDataRepository {
  createMany(
    data: {
      politician_id: string;
      title: string;
      likes_count: number;
      followers_count: number;
      start_of_period: Date;
      end_of_period: Date;
    }[]
  ): Promise<void>;
  findDetails(data: { id: string; period: number }): Promise<any>;
}
