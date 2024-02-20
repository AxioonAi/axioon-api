import { env } from "@/env";
import { SexType } from "@prisma/client";
import OpenAI from "openai";

export async function gptCommentProcess(item: {
	author?: string;
	username?: string;
	ownerUsername?: string;
	id: string;
	text: string;
}) {
	const openAi = new OpenAI({
		apiKey: env.GPT_KEY,
	});

	let retryCount = 0;
	const author =
		item.author || item.username || item.ownerUsername || "anônimo";
	while (retryCount < 5) {
		try {
			const response = await openAi.chat.completions.create({
				model: "gpt-3.5-turbo-16k",
				messages: [
					{
						role: "system",
						content: `Haja como um especialista em interpretação de comentários, seja extremamente crítico e nos ajude a dar um número que será usado como Métrica para o sentimentAnalysis, sendo os números classificados como: 100 - 150: Extremamente Negativo; 150 - 300: Negativo; 300 - 700: Neutro; 700 - 850: Positivo; 850 - 1000: Extremamente positivo (SEMPRE USE NÚMEROS PRA CLASSIFICAR).
	                                    Use essa métrica em relação especificamente ao comentário em questão.
	                                    A Resposta deve ser SOMENTE um objeto:
	                                    {
	                                      "ownerUsername": "NomeDoUsuario",
	                                      "gender": "Masculino ou Feminino ou  Indefinido",
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
						content: `O usuário do comentário é: ${author}\n\n`,
					},
					{
						role: "user",
						content: `O texto do comentário feito pelo usuario no post original é: ${item.text}`,
					},
					{
						role: "user",
						content: `o id do comentário é: ${item.id}`,
					},
					{
						role: "system",
						content: `Lembre-se sentimentAnalysis PRECISA ser um numero e
	                                    Retorne Sempre:
	                                    {
	                                      "ownerUsername": "NomeDoUsuario",
	                                      "Gender": "Masculino ou Feminino ou  Indefinido",
	                                      "sentimentAnalysis": "numero",
	                                "id":"commentId"
	                                    }
	                                    nao comente NADA alem disso.
	                                    `,
					},
				],
			});
			const answer = response.choices[0].message.content;
			if (answer?.startsWith("{")) {
				const finalAnswer = JSON.parse(answer);
				return {
					id: item.id,
					authorGender:
						finalAnswer.gender === "Masculino"
							? SexType.MALE
							: finalAnswer.gender === "Feminino"
							  ? SexType.FEMALE
							  : SexType.UNKNOWN,
					sentimentAnalysis: finalAnswer.sentimentAnalysis,
				};
			}
		} catch (err) {
			console.error("Erro ao processar o item: ", err);
		}
		retryCount++;
	}
	return null;
}

