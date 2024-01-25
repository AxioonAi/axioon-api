import { MentionsData } from "@/@types/politicianProfileRepository";

export const mentionsFormatter = (data: MentionsData) => {
	let totalSentimentNews = 0;
	let totalSentimentMentions = 0;
	let totalSentimentComments = 0;

	const news: newsData = {
		positive: 0,
		neutral: 0,
		negative: 0,
		total: data.news.length,
		average: 0,
		news: [],
	};

	const mentions: mentionsData = {
		positive: 0,
		neutral: 0,
		negative: 0,
		total: data.instagramMention.length,
		average: 0,
		mentions: [],
	};

	if (data.news.length > 0) {
		for (const item of data.news) {
			totalSentimentNews += item.sentimentAnalysis;
			const sentiment = classifySentiment(item.sentimentAnalysis);

			if (sentiment === "positivo") news.positive++;
			if (sentiment === "neutro") news.neutral++;
			if (sentiment === "negativo") news.negative++;

			news.news.push({
				sentiment: item.sentimentAnalysis,
				sentimentClassification: sentiment,
				title: item.news.title,
				url: item.news.url,
				date: item.news.last_update,
			});
		}
		news.average = totalSentimentNews / data.news.length;
	}

	if (data.instagramMention.length > 0) {
		// Processando as menções do Instagram
		for (const item of data.instagramMention) {
			totalSentimentMentions += item.sentimentAnalysis;
			const sentiment = classifySentiment(item.sentimentAnalysis);
			let commentSentimentTotal = 0;

			if (sentiment === "positivo") mentions.positive++;
			if (sentiment === "neutro") mentions.neutral++;
			if (sentiment === "negativo") mentions.negative++;

			for (const comment of item.comments) {
				totalSentimentComments += comment.sentimentAnalysis;
				commentSentimentTotal += comment.sentimentAnalysis;
			}

			mentions.mentions.push({
				sentiment: item.sentimentAnalysis,
				sentimentClassification: sentiment,
				commentSentiment: commentSentimentTotal / item.comments.length,
				profile: item.ownerUsername,
				date: item.pubDate,
				comments: item.comments,
				title: item.description,
				url: item.postUrl,
			});
		}

		mentions.average = totalSentimentMentions / data.instagramMention.length;
	}

	return {
		news,
		mentions,
	};
};

function classifySentiment(sentimentScore: number) {
	if (sentimentScore > 600) return "positivo";
	if (sentimentScore >= 400 && sentimentScore <= 600) return "neutro";
	return "negativo";
}

interface newsData {
	positive: number;
	neutral: number;
	negative: number;
	total: number;
	average: number;
	news: {
		sentiment: number;
		sentimentClassification: string;
		title: string;
		url: string;
		date: Date;
	}[];
}

interface mentionsData {
	positive: number;
	neutral: number;
	negative: number;
	total: number;
	average: number;
	mentions: {
		sentiment: number;
		sentimentClassification: string;
		commentSentiment: number;
		profile: string;
		date: Date;
		comments: {
			id: string;
			text: string;
			sentimentAnalysis: number;
		}[];
		title: string;
		url: string;
	}[];
}
