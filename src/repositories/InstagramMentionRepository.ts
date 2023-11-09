export interface InstagramMentionRepository {
  createMany(
    data: {
      postUrl: string;
      description: string;
      commentCount: number;
      likeCount: number;
      pubDate: Date;
      viewCount: number;
      username: string;
      imgUrl: string;
      postId: string;
      user_id: string;
      playCount: number;
      ownerFullName: string;
      ownerUsername: string;
    }[]
  ): Promise<any>;
}
