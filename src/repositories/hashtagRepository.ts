import {
  Hashtag,
  InstagramHashtagMention,
  InstagramHashtagMentionComment,
  TiktokHashtagCommentData,
  TiktokHashtagMention,
} from "@prisma/client";

interface HashtagMentions extends Hashtag {
  instagramMentions: InstagramHashtagMention[];
  instagramMentionsComments: InstagramHashtagMentionComment[];
  tiktokMentions: TiktokHashtagMention[];
  tiktokMentionsComments: TiktokHashtagCommentData[];
}

export interface HashtagRepository {
  findByHashtag(hashtag: string): Promise<Hashtag | null>;
  create(data: { hashtag: string }): Promise<Hashtag>;
  findByUserId(userId: string): Promise<Hashtag[]>;
  findHashtagMentions(data: {
    userId: string;
    startDate: Date;
    endDate: Date;
  }): Promise<HashtagMentions[]>;
  findMany(): Promise<Hashtag[]>;
}
