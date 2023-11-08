export interface FacebookBaseDataRepository {
  createMany(
    data: {
      user_id: string;
      likes_count: number;
      followers_count: number;
      start_of_period: Date;
      end_of_period: Date;
    }[]
  ): Promise<void>;
}
