import { InstagramPostRepository } from "@/repositories/InstagramPostRepository";
import { InstagramPost } from "@prisma/client";

interface CreateInstagramPostUseCaseRequest {
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
  }[];
}

interface CreateInstagramPostUseCaseResponse {
  posts: InstagramPost[];
}

export class CreateInstagramPostUseCase {
  constructor(private instagramPost: InstagramPostRepository) {}

  async execute({
    data,
  }: CreateInstagramPostUseCaseRequest): Promise<CreateInstagramPostUseCaseResponse> {
    const posts = await this.instagramPost.createMany(data);

    return { posts };
  }
}
