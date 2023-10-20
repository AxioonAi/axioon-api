export interface InstagramPostRepository {
  // findById(id: string): Promise<InstagramPost>;
  // create(data: Prisma.InstagramPostCreateInput): Promise<InstagramPost>;
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
      query: string;
      user_instagram: string;
    }[]
  ): Promise<any>;
  // findByUserId(id: string): Promise<InstagramPost[]>;
}