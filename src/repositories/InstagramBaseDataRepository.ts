export interface InstagramBaseDataRepository {
  createMany(
    data: {
      politician_id: string;
      followers: number;
      follows: number;
      posts_count: number;
      reels_count: number;
      business: boolean;
      verified: boolean;
      biography: string;
      url: string;
      fullName: string;
      profilePicture: string;
      start_of_period: Date;
      end_of_period: Date;
    }[]
  ): Promise<any>;
}
