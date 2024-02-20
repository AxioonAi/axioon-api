import { GptMentionDataInterface } from "@/@types/databaseInterfaces";
import OpenAI from "openai";
import { env } from "process";

export const gptMentionsProcess = async (data:GptMentionDataInterface) =>{
    const openAi = new OpenAI({
        apiKey: env.GPT_KEY,
    });

        let success = false;
        let retryCount = 0;
        while (!success && retryCount < 3) {
            try {
                const response = await openAi.chat.completions.create({
                    model: "gpt-3.5-turbo-16k",
                    messages: [
                        {
                            role: "system",
                            content: `Haja como um especialista em interpretação de publicações de redes sociais, seja extremamente crítico e nos ajude a dar um número que será usado como Métrica para o sentimentAnalysis, sendo os números classificados como: 100 - 150: Extremamente Negativo; 150 - 300: Negativo; 300 - 700: Neutro; 700 - 850: Positivo; 850 - 1000: Extremamente positivo (SEMPRE USE NÚMEROS PRA CLASSIFICAR).
                Use essa métrica em relação especificamente a publicação em questão.
                A Resposta deve ser SOMENTE um objeto:
                {

                    "id":"postId",
                  "sentimentAnalysis": "numero"
                }
                `,
                        },
                        {
                            role: "system",
                            content:
                                "O resultado de sentimentAnalysis Deve ser um número, seja crítico nesse número, use a métrica para isso.",
                        },
                        {
                            role: "system",
                            content:
                                "NUNCA COMENTE NADA, sua função é entregar os dados puros.",
                        },
                        {
                            role: "user",
                            content: `O texto do  post original é: ${data.description}`,
                        },
                        {
                            role: "user",
                            content: `o id do comentário é: ${data.id}`,
                        },
                        {
                            role: "system",
                            content: `Lembre-se sentimentAnalysis PRECISA ser um numero e
                Retorne Sempre:
                {
                  "id":"commentId",
                  "sentimentAnalysis": "numero"
                }
                nao comente NADA alem disso.
                `,
                        },
                    ],
                });
                const answer = response.choices[0].message.content;
                if (answer?.startsWith("{")) {
                    const finalAnswer = JSON.parse(answer);

                    if (/^\d+$/.test(finalAnswer.sentimentAnalysis)) {
                        success = true;
                        return {
                            id: data.id,
                            description: data.description,
                            sentimentAnalysis: finalAnswer.sentimentAnalysis,
                        }
                    }

                    success = true;
                } else {
                    success = false;
                    retryCount++;
                }
            } catch (err) {
                retryCount++;
            }
    }
    return null

}
