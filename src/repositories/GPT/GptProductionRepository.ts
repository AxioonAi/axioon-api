import {
	GptCommentDataInterface,
	GptMentionDataInterface,
	GptNewsDataInterface,
} from "@/@types/databaseInterfaces";
import { SexType } from "@prisma/client";
import { GptRepository } from "../gptRepository";

export class GptProductionRepository implements GptRepository {
	// async commentAnalysis(data: GptCommentDataInterface[]) {
	// 	const openAi = new OpenAI({
	// 		apiKey: env.GPT_KEY,
	// 	});

	// 	const finalData: GptCommentResponseInterface[] = [];
	// 	for (const item of data) {
	// 		let success = false;
	// 		let retryCount = 0;
	// 		const author = item.author
	// 			? item.author
	// 			: item.username
	// 			  ? item.username
	// 			  : item.ownerUsername
	// 				  ? item.ownerUsername
	// 				  : "anônimo";

	// 		while (!success && retryCount < 3) {
	// 			try {
	// 				console.time("Timing:");
	// 				const response = await openAi.chat.completions.create({
	// 					model: "gpt-3.5-turbo-16k",
	// 					messages: [
	// 						{
	// 							role: "system",
	// 							content: `Haja como um especialista em interpretação de comentários, seja extremamente crítico e nos ajude a dar um número que será usado como Métrica para o sentimentAnalysis, sendo os números classificados como: 100 - 150: Extremamente Negativo; 150 - 300: Negativo; 300 - 700: Neutro; 700 - 850: Positivo; 850 - 1000: Extremamente positivo (SEMPRE USE NÚMEROS PRA CLASSIFICAR).
	//                 Use essa métrica em relação especificamente ao comentário em questão.
	//                 A Resposta deve ser SOMENTE um objeto:
	//                 {
	//                   "ownerUsername": "NomeDoUsuario",
	//                   "gender": "Masculino ou Feminino ou  Indefinido",
	//                   "sentimentAnalysis": "numero"
	//                 }
	//                 `,
	// 						},
	// 						{
	// 							role: "system",
	// 							content:
	// 								"O resultado de sentimentAnalysis Deve ser um número, seja crítico nesse número, use a métrica para isso.",
	// 						},
	// 						{
	// 							role: "system",
	// 							content:
	// 								"NUNCA COMENTE NADA, sua função é entregar os dados puros.",
	// 						},
	// 						{
	// 							role: "user",
	// 							content: `O usuário do comentário é: ${author}\n\n`,
	// 						},
	// 						{
	// 							role: "user",
	// 							content: `O texto do comentário feito pelo usuario no post original é: ${item.text}`,
	// 						},
	// 						{
	// 							role: "user",
	// 							content: `o id do comentário é: ${item.id}`,
	// 						},
	// 						{
	// 							role: "system",
	// 							content: `Lembre-se sentimentAnalysis PRECISA ser um numero e
	//                 Retorne Sempre:
	//                 {
	//                   "ownerUsername": "NomeDoUsuario",
	//                   "Gender": "Masculino ou Feminino ou  Indefinido",
	//                   "sentimentAnalysis": "numero",
	//             "id":"commentId"
	//                 }
	//                 nao comente NADA alem disso.
	//                 `,
	// 						},
	// 					],
	// 				});
	// 				const answer = response.choices[0].message.content;
	// 				if (answer?.startsWith("{")) {
	// 					const finalAnswer = JSON.parse(answer);
	// 					finalData.push({
	// 						id: item.id,
	// 						authorGender:
	// 							finalAnswer.gender === "Masculino"
	// 								? SexType.MALE
	// 								: finalAnswer.gender === "Feminino"
	// 								  ? SexType.FEMALE
	// 								  : SexType.UNKNOWN,
	// 						sentimentAnalysis: finalAnswer.sentimentAnalysis,
	// 					});

	// 					success = true;
	// 				} else {
	// 					success = false;
	// 					retryCount++;
	// 				}
	// 			} catch (err) {
	// 				retryCount++;
	// 			}
	// 		}
	// 	}

	// 	return finalData;
	// }

	// async mentionAnalysis(data: GptMentionDataInterface[]) {
	// 	const openAi = new OpenAI({
	// 		apiKey: env.GPT_KEY,
	// 	});

	// 	const finalData: GptMentionResponseInterface[] = [];
	// 	for (const item of data) {
	// 		let success = false;
	// 		let retryCount = 0;
	// 		while (!success && retryCount < 3) {
	// 			try {
	// 				const response = await openAi.chat.completions.create({
	// 					model: "gpt-3.5-turbo-16k",
	// 					messages: [
	// 						{
	// 							role: "system",
	// 							content: `Haja como um especialista em interpretação de publicações de redes sociais, seja extremamente crítico e nos ajude a dar um número que será usado como Métrica para o sentimentAnalysis, sendo os números classificados como: 100 - 150: Extremamente Negativo; 150 - 300: Negativo; 300 - 700: Neutro; 700 - 850: Positivo; 850 - 1000: Extremamente positivo (SEMPRE USE NÚMEROS PRA CLASSIFICAR).
	//                 Use essa métrica em relação especificamente a publicação em questão.
	//                 A Resposta deve ser SOMENTE um objeto:
	//                 {

	// 					"id":"postId",
	//                   "sentimentAnalysis": "numero"
	//                 }
	//                 `,
	// 						},
	// 						{
	// 							role: "system",
	// 							content:
	// 								"O resultado de sentimentAnalysis Deve ser um número, seja crítico nesse número, use a métrica para isso.",
	// 						},
	// 						{
	// 							role: "system",
	// 							content:
	// 								"NUNCA COMENTE NADA, sua função é entregar os dados puros.",
	// 						},
	// 						{
	// 							role: "user",
	// 							content: `O texto do  post original é: ${item.description}`,
	// 						},
	// 						{
	// 							role: "user",
	// 							content: `o id do comentário é: ${item.id}`,
	// 						},
	// 						{
	// 							role: "system",
	// 							content: `Lembre-se sentimentAnalysis PRECISA ser um numero e
	//                 Retorne Sempre:
	//                 {
	//             	  "id":"commentId",
	// 				  "sentimentAnalysis": "numero"
	//                 }
	//                 nao comente NADA alem disso.
	//                 `,
	// 						},
	// 					],
	// 				});
	// 				const answer = response.choices[0].message.content;
	// 				if (answer?.startsWith("{")) {
	// 					const finalAnswer = JSON.parse(answer);

	// 					if (/^\d+$/.test(finalAnswer.sentimentAnalysis)) {
	// 						success = true;
	// 						finalData.push({
	// 							id: item.id,
	// 							description: item.description,
	// 							sentimentAnalysis: finalAnswer.sentimentAnalysis,
	// 						});
	// 					}

	// 					success = true;
	// 				} else {
	// 					success = false;
	// 					retryCount++;
	// 				}
	// 			} catch (err) {
	// 				retryCount++;
	// 			}
	// 		}
	// 	}

	// 	return finalData;
	// }

	// async newsAnalysis(data: GptNewsDataInterface[]) {
	// 	const openAi = new OpenAI({
	// 		apiKey: env.GPT_KEY,
	// 	});

	// 	const finalData: GptNewsResponseInterface[] = [];
	// 	for (const item of data) {
	// 		let success = false;
	// 		let retryCount = 0;
	// 		while (!success && retryCount < 3) {
	// 			try {
	// 				const response = await openAi.chat.completions.create({
	// 					model: "gpt-3.5-turbo-16k",
	// 					messages: [
	// 						{
	// 							role: "system",
	// 							content: `Haja como um especialista em interpretação de Notícias, seja extremamente crítico e nos ajude a dar um número que será usado como Métrica para o sentimentAnalysis, sendo os números classificados como: 100 - 150: Extremamente Negativo; 150 - 300: Negativo; 300 - 700: Neutro; 700 - 850: Positivo; 850 - 1000: Extremamente positivo.
	// 							Use essa métrica em relação especificamente na parte que a notícia fala sobre o político em específico.
	// 							A métrica deve ser somente relação ao que a notícia fala sobre político em questão.
	// 							a Resposta deve ser SOMENTE um array:
	// 							"users": [
	// 							  {
	// 							  "name": "NomeDoPolitico",
	// 							  "politician_id": "idDoPolitico",
	// 							  "sentimentAnalysis": "numero"
	// 							  }
	// 							]
	// 							`,
	// 						},
	// 						{
	// 							role: "system",
	// 							content:
	// 								"O resultado de sentimentAnalysis Deve ser um número, seja crítico nesse número, use a métrica para isso , caso tenha mais de um político Analisado, faça um sentimentAnalysis para cada um deles;",
	// 						},
	// 						{
	// 							role: "system",
	// 							content:
	// 								"NUNCA COMENTE NADA sua função 'é entregar os dados puros",
	// 						},

	// 						{
	// 							role: "user",
	// 							content: `O(s) nome(s) do(s) político(s)e seus ids são a serem analisado(s) são: ${item.users
	// 								.map((user) => `${user.name} - ${user.user_id}`)
	// 								.join(" e ")}\n\n`,
	// 						},
	// 						{
	// 							role: "user",
	// 							content: `O título da notícia é: ${item.title}`,
	// 						},
	// 						{
	// 							role: "user",
	// 							content: `O conteúdo da notícia é ${item.content}`,
	// 						},
	// 						{
	// 							role: "system",
	// 							content: `Lembre-se sentimentAnalysis PRECISA ser um numero e
	// 						  Retorne Sempre "users": [
	// 							{
	// 							  "name": "NomeDoPolitico",
	// 							  "politician_id": "idDoPolitico",
	// 							  "sentimentAnalysis": "numero",

	// 							}
	// 							nao comente NADA alem disso.
	// 						  ]`,
	// 						},
	// 					],
	// 				});
	// 				const answer = response.choices[0].message.content;
	// 				if (answer?.startsWith("{")) {
	// 					const finalAnswer: GptNewsResponseInterface = JSON.parse(answer);
	// 					finalData.push({
	// 						title: item.title,
	// 						users: finalAnswer.users,
	// 					});
	// 					success = true;
	// 				} else if (answer?.startsWith('"users": [')) {
	// 					success = true;
	// 					const usersIndex = answer.indexOf('"users": [');
	// 					const usersSubstring = answer.substring(usersIndex);

	// 					const finalAnswer = JSON.parse(`{${usersSubstring}}`);
	// 					finalData.push({
	// 						title: item.title,
	// 						users: finalAnswer.users,
	// 					});
	// 				} else {
	// 					success = false;
	// 					retryCount++;
	// 				}
	// 			} catch (err) {
	// 				retryCount++;
	// 			}
	// 		}
	// 	}
	// 	return finalData;
	// }
	async mentionAnalysis(data: GptMentionDataInterface[]) {
		const finalData = [];

		for (const item of data) {
			finalData.push({
				id: item.id,
				description: item.description,
				sentimentAnalysis: Math.abs(Math.round(Math.random() * 900 + 100)),
			});
		}

		return finalData;
	}
	async commentAnalysis(data: GptCommentDataInterface[]) {
		const finalData = [];
		for (const item of data) {
			finalData.push({
				id: item.id,
				username: item.username,
				authorGender: SexType.UNKNOWN,
				author: item.author,
				sentimentAnalysis: Math.abs(Math.round(Math.random() * 900 + 100)),
			});
		}
		return finalData;
	}
	async newsAnalysis(data: GptNewsDataInterface[]) {
		const finalData = [];
		for (const item of data) {
			finalData.push({
				title: item.title,
				users: item.users.map((user) => {
					return {
						name: user.name,
						politician_id: user.user_id,
						sentimentAnalysis: Math.abs(Math.round(Math.random() * 900 + 100)),
					};
				}),
			});
		}
		return finalData;
	}
}
