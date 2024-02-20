import { GptNewsDataInterface, GptNewsResponseInterface } from "@/@types/databaseInterfaces";
import { env } from "@/env";
import OpenAI from "openai";

export const gptNewsProcess = async (
    data: GptNewsDataInterface
) => {
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
                            content: `Haja como um especialista em interpretação de Notícias, seja extremamente crítico e nos ajude a dar um número que será usado como Métrica para o sentimentAnalysis, sendo os números classificados como: 100 - 150: Extremamente Negativo; 150 - 300: Negativo; 300 - 700: Neutro; 700 - 850: Positivo; 850 - 1000: Extremamente positivo.
                            Use essa métrica em relação especificamente na parte que a notícia fala sobre o político em específico.
                            A métrica deve ser somente relação ao que a notícia fala sobre político em questão.
                            a Resposta deve ser SOMENTE um array:
                            "users": [
                              {
                              "name": "NomeDoPolitico",
                              "politician_id": "idDoPolitico",
                              "sentimentAnalysis": "numero"
                              }
                            ]
                            `,
                        },
                        {
                            role: "system",
                            content:
                                "O resultado de sentimentAnalysis Deve ser um número, seja crítico nesse número, use a métrica para isso , caso tenha mais de um político Analisado, faça um sentimentAnalysis para cada um deles;",
                        },
                        {
                            role: "system",
                            content:
                                "NUNCA COMENTE NADA sua função 'é entregar os dados puros",
                        },

                        {
                            role: "user",
                            content: `O(s) nome(s) do(s) político(s)e seus ids são a serem analisado(s) são: ${data.users
                                .map((user) => `${user.name} - ${user.user_id}`)
                                .join(" e ")}\n\n`,
                        },
                        {
                            role: "user",
                            content: `O título da notícia é: ${data.title}`,
                        },
                        {
                            role: "user",
                            content: `O conteúdo da notícia é ${data.content}`,
                        },
                        {
                            role: "system",
                            content: `Lembre-se sentimentAnalysis PRECISA ser um numero e
                          Retorne Sempre "users": [
                            {
                              "name": "NomeDoPolitico",
                              "politician_id": "idDoPolitico",
                              "sentimentAnalysis": "numero",

                            }
                            nao comente NADA alem disso.
                          ]`,
                        },
                    ],
                });
                const answer = response.choices[0].message.content;
                if (answer?.startsWith("{")) {
                    const finalAnswer: GptNewsResponseInterface = JSON.parse(answer);
                    return {
                        title: data.title,
                        users: finalAnswer.users,
                    }
                    success = true;
                } else if (answer?.startsWith('"users": [')) {
                    success = true;
                    const usersIndex = answer.indexOf('"users": [');
                    const usersSubstring = answer.substring(usersIndex);

                    const finalAnswer = JSON.parse(`{${usersSubstring}}`);
                    return {
                        title: data.title,
                        users: finalAnswer.users,
                    }
                } else {
                    success = false;
                    retryCount++;
                }
            } catch (err) {
                retryCount++;
            }}
            return null
}