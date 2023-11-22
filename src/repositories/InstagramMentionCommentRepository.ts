export interface InstagramMentionCommentRepository {
  createMany(
    data: {
      id: string;
      text: string;
      ownerProfilePicUrl: string;
      post_id: string;
      ownerUsername: string;
      timestamp: string;
      likeCount: number;
      politician_id: string;
    }[]
  ): Promise<void>;
}
