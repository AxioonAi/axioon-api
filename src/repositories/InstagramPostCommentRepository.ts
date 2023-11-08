export interface InstagramPostCommentRepository {
  createMany(
    data: {
      text: string;
      ownerProfilePicUrl: string;
      post_id: string;
      ownerUsername: string;
      timestamp: string;
      likeCount: number;
    }[]
  ): Promise<void>;
}
