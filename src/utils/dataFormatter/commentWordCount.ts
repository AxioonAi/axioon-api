import { CommentWordCountDataInterface } from "@/@types/useCaseInterfaces";

type Comment = {
  text: string;
  sentimentAnalysis: number;
};

type SocialMediaData = {
  instagramPostComments: Comment[];
  facebookPostComments: Comment[];
  tiktokComments: Comment[];
  youtubeCommentData: Comment[];
};

type WordData = {
  word: string;
  quantity: number;
  sentimentSum: number;
  sentimentAvg: number;
};

type EmojiData = {
  emoji: string;
  quantity: number;
  sentimentSum: number;
  sentimentAvg: number;
};

type ProcessedData = {
  words: WordData[];
  emojis: EmojiData[];
};

type ResultData = {
  [key: string]: ProcessedData;
};
export const CommentWordCount = (data: CommentWordCountDataInterface) => {
  const socialMediaSources = [
    { name: "instagram", comments: data.instagramPostComments },
    { name: "facebook", comments: data.facebookPostComments },
    { name: "tiktok", comments: data.tiktokComments },
    { name: "youtube", comments: data.youtubeCommentData },
  ];

  const emojiRegex =
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  const wordRegex = /\b[a-zA-ZÀ-ÿ]{3,}\b/g;

  const result: ResultData = {};

  socialMediaSources.forEach((source) => {
    const comments = source.comments;
    const fullString = comments.map((objeto) => objeto.text).join(" ");
    const fullStringWithoutEmojis = fullString.replace(emojiRegex, "");
    const words = fullStringWithoutEmojis.match(wordRegex);
    const emojis = fullString.match(emojiRegex);

    const wordCount: Record<
      string,
      { quantity: number; sentimentSum: number }
    > = {};
    const emojiCount: Record<
      string,
      { quantity: number; sentimentSum: number }
    > = {};

    if (words) {
      words.forEach((word) => {
        if (!wordCount[word]) {
          wordCount[word] = { quantity: 0, sentimentSum: 0 };
        }
        wordCount[word].quantity += 1;
      });
    }

    if (emojis) {
      emojis.forEach((emoji) => {
        if (!emojiCount[emoji]) {
          emojiCount[emoji] = { quantity: 0, sentimentSum: 0 };
        }
        emojiCount[emoji].quantity += 1;
      });
    }

    comments.forEach((comment) => {
      const commentWords = comment.text
        .replace(emojiRegex, "")
        .match(wordRegex);
      if (commentWords) {
        commentWords.forEach((word) => {
          if (wordCount[word]) {
            wordCount[word].sentimentSum += comment.sentimentAnalysis;
          }
        });
      }

      const commentEmojis = comment.text.match(emojiRegex);
      if (commentEmojis) {
        commentEmojis.forEach((emoji) => {
          if (emojiCount[emoji]) {
            emojiCount[emoji].sentimentSum += comment.sentimentAnalysis;
          }
        });
      }
    });

    const wordArray: WordData[] = Object.entries(wordCount)
      .map(([word, data]) => ({
        word,
        quantity: data.quantity,
        sentimentSum: data.sentimentSum,
        sentimentAvg: data.sentimentSum / data.quantity,
      }))
      .filter((objeto) => objeto.quantity > 5 && objeto.word.length > 4);

    const emojiArray: EmojiData[] = Object.entries(emojiCount).map(
      ([emoji, data]) => ({
        emoji,
        quantity: data.quantity,
        sentimentSum: data.sentimentSum,
        sentimentAvg: data.sentimentSum / data.quantity,
      })
    );

    result[source.name] = {
      words: wordArray,
      emojis: emojiArray,
    };
  });

  return result;
};
