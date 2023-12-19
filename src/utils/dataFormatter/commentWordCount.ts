import { CommentWordCountDataInterface } from "@/@types/useCaseInterfaces";

export const CommentWordCount = (data: CommentWordCountDataInterface) => {
  const comments = [
    ...data.instagramPostComments,
    ...data.facebookPostComments,
    ...data.tiktokComments,
    ...data.youtubeCommentData,
  ];

  const fullString = comments.map((objeto) => objeto.text).join(" ");

  const fullStringWithoutEmojis = fullString.replace(
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu,
    ""
  );

  const words = fullStringWithoutEmojis.match(/\b\w{3,}\b/g);

  if (!words) {
    return comments;
  }

  const contagem: Record<string, number> = words.reduce(
    (acc: Record<string, number>, word: string) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    },
    {}
  );

  const arrayDeObjetos = Object.entries(contagem).map(([chave, valor]) => {
    return { word: chave, quantity: valor };
  });

  return arrayDeObjetos.filter((objeto) => objeto.quantity > 5);
};
