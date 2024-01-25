import {
	YoutubeDataFormatterBaseDataInterface,
	YoutubeDataFormatterCommentDataInterface,
	YoutubeDataFormatterInterface,
	YoutubeDataFormatterVideoDataInterface,
} from "@/@types/formatData";
import { YoutubeDataFormatterFinalDataInterface } from "@/@types/useCaseInterfaces";

export const youtubeDataFormatter = (
	data: YoutubeDataFormatterInterface,
	alternativeBaseData: YoutubeDataFormatterBaseDataInterface,
) => {
	const { youtubeBaseData, youtubeVideoData, youtubeCommentData } = data;

	const baseData = youtubeBaseData[0]
		? youtubeBaseData[0]
		: alternativeBaseData;
	const commentStatisticsData = commentFormatter(youtubeCommentData);
	const oldVideoDateDiff = mostOldVideoDiffCalculator(youtubeVideoData);

	const dataWithEngagement = [];

	const videoEngagementData = {
		like: 0,
		comments: 0,
		views: 0,
		sentiment: commentStatisticsData.sentimentStatistics.sentimentAverage,
	};

	for (const key in youtubeVideoData) {
		videoEngagementData.like += youtubeVideoData[key].likes;
		videoEngagementData.comments += youtubeVideoData[key].commentsCount;
		videoEngagementData.views += youtubeVideoData[key].viewCount;
		const timeDiff =
			Math.abs(Date.now() - new Date(youtubeVideoData[key].date).getTime()) /
			(1000 * 60 * 60 * 24);

		const engagementSum =
			youtubeVideoData[key].commentsCount * 1 +
			youtubeVideoData[key].likes * 1.2 +
			youtubeVideoData[key].viewCount * 1;

		const dateDiffRelation = 1 - timeDiff / oldVideoDateDiff;

		const comments = youtubeCommentData.filter(
			(comment) => comment.video_id === youtubeVideoData[key].id,
		);

		let sentimentSum = 0;

		const formattedComments = [];

		for (const comment of comments) {
			const { author, ...rest } = comment;
			sentimentSum += comment.sentimentAnalysis;

			formattedComments.push({
				username: author,
				...rest,
			});
		}

		const engagement =
			(engagementSum * dateDiffRelation) /
			100 /
			(baseData.channel_total_subs / 1000);

		dataWithEngagement.push({
			...youtubeVideoData[key],
			engagement,
			comments: formattedComments,
			sentiment: sentimentSum / comments.length,
		});
	}

	const rankByEngagement = dataWithEngagement.sort((a, b) => {
		return b.engagement - a.engagement;
	});

	const mostRankedVideo = rankByEngagement[0];

	const finalData: YoutubeDataFormatterFinalDataInterface[] = [];
	for (const video of dataWithEngagement) {
		const { likes, commentsCount, viewCount, ...rest } = video;
		finalData.push({
			...rest,
			like: likes,
			commentCount: commentsCount,
			views: viewCount,
			percentage: (video.engagement / mostRankedVideo.engagement) * 100,
		});
	}

	return {
		commentsStatistics: commentStatisticsData,
		videoEngagementData,
		videos: finalData,
	};
};

const commentFormatter = (
	comments: YoutubeDataFormatterCommentDataInterface[],
) => {
	const commentStatisticsData = comments.reduce(
		(accumulator, comment) => {
			const sentiment = comment.sentimentAnalysis;

			// Calcula a média
			accumulator.sentimentStatistics.totalSentiment += sentiment;

			// Conta a quantidade de comentários em diferentes faixas de tempo

			// Conta a quantidade de comentários em diferentes faixas de sentimentAnalysis
			if (sentiment >= 0 && sentiment <= 350) {
				accumulator.sentimentStatistics.countSentiment0To350++;
			} else if (sentiment > 350 && sentiment <= 650) {
				accumulator.sentimentStatistics.countSentiment351To650++;
			} else if (sentiment > 650 && sentiment <= 1000) {
				accumulator.sentimentStatistics.countSentiment651To1000++;
			}

			return accumulator;
		},
		{
			sentimentStatistics: {
				totalSentiment: 0,
				countSentiment0To350: 0,
				countSentiment351To650: 0,
				countSentiment651To1000: 0,
				sentimentAverage: 0,
			},
		},
	);

	commentStatisticsData.sentimentStatistics.sentimentAverage =
		commentStatisticsData.sentimentStatistics.totalSentiment / comments.length;

	return commentStatisticsData;
};

const mostOldVideoDiffCalculator = (
	videos: YoutubeDataFormatterVideoDataInterface[],
) => {
	const mostOldVideo = videos.sort((a, b) => {
		return a.date < b.date ? -1 : 1;
	})[0];
	return mostOldVideo
		? Math.ceil(
				Math.abs(Date.now() - new Date(mostOldVideo.date).getTime()) /
					(1000 * 60 * 60 * 24),
		  )
		: 0;
};
