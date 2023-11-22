export interface InstagramMentionRepository {
  createMany(
    data: {
      id: string;
      postUrl: string;
      description: string;
      commentCount: number;
      likeCount: number;
      pubDate: Date;
      viewCount: number;
      username: string;
      imgUrl: string;
      postId: string;
      politician_id: string;
      playCount: number;
      ownerFullName: string;
      ownerUsername: string;
    }[]
  ): Promise<any>;
}
