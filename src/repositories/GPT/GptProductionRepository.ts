import {
	GptCommentDataInterface,
	GptCommentResponseInterface,
	GptMentionDataInterface,
	GptMentionResponseInterface,
	GptNewsDataInterface,
	GptNewsResponseInterface
} from "@/@types/databaseInterfaces";
import { gptCommentProcess } from "@/utils/GPT/gptCommentFunctions";
import { gptMentionsProcess } from "@/utils/GPT/gptMentionsFunctions";
import { gptNewsProcess } from "@/utils/GPT/gptNewsFunctions";
import { GptRepository } from "../gptRepository";

export class GptProductionRepository implements GptRepository {
	async mentionAnalysis(data: GptMentionDataInterface[]) {
		const batchSize = 50;
		let batchStart = 0;
		const finalData: GptMentionResponseInterface[] = [];
		while (batchStart < data.length) {
			const batch = data.slice(batchStart, batchStart + batchSize);
			const results = await Promise.all(
				batch.map((item) => gptMentionsProcess(item)),
			);

			finalData.push(
				...results.filter(
					(item): item is GptMentionResponseInterface => item !== null,
				),
			);

			batchStart += batchSize;
		}

		return finalData;
	}

	async newsAnalysis(data: GptNewsDataInterface[]) {
		const batchSize = 58;
		let batchStart = 0;
		const finalData: GptNewsResponseInterface[] = [];

		while (batchStart < data.length) {
			const batch = data.slice(batchStart, batchStart + batchSize);
			const results = await Promise.all(
				batch.map((item) => gptNewsProcess(item)),
			);

			finalData.push(
				...results.filter(
					(item): item is GptNewsResponseInterface => item !== null,
				),
			);

			batchStart += batchSize;
		}

		return finalData
	}

	async commentAnalysis(data: GptCommentDataInterface[]) {
		const batchSize = 10 ;
		let batchStart = 0;
		const finalData: GptCommentResponseInterface[] = [];
		
		console.log(data.length)

		while (batchStart < data.length) {
			const batch = data.slice(batchStart, batchStart + batchSize);
			const results = await Promise.all(
				batch.map((item) => gptCommentProcess(item)),
			);

			finalData.push(
				...results.filter(
					(item): item is GptCommentResponseInterface => item !== null,
				),
			);

			batchStart += batchSize;
			console.log("batchStart:", batchStart)
		}

		return finalData;
	}

	// async commentAnalysis(data: GptCommentDataInterface[]){

	// 	const finalData: GptCommentResponseInterface[] = []

	// 	for(const item of data){
	// 		finalData.push({
	// 			...item,
	// 			authorGender:SexType.FEMALE,
	// 			id: item.id,
	// 			sentimentAnalysis:500
	// 		})
	// 	}
	// 	return finalData
	// }
}
