import { TiktokDataFormatterFinalDataInterface } from "@/@types/useCaseInterfaces";

export const tiktokDataFormatter = (data: {
	tiktokData: {
		id: string;
		fans: number;
		videos: number;
		verified: boolean;
		avatar: string;
		heart: number;
	}[];
	tiktokVideoData: {
		id: string;
		text: string;
		url: string;
		diggCount: number;
		commentCount: number;
		shareCount: number;
		playCount: number;
		date: Date;
	}[];
	tiktokComments: {
		id: string;
		diggCount: number;
		date: Date;
		replyCount: number;
		author: string;
		video_id: string;
		text: string;
		sentimentAnalysis: number;
	}[];
}) => {
	const { tiktokData, tiktokVideoData, tiktokComments } = data;

	const commentStatisticsData = tiktokComments.reduce(
		(accumulator, comment) => {
			const sentiment = comment.sentimentAnalysis;

			const time = new Date(comment.date).getHours();
			// Calcula a média
			accumulator.sentimentStatistics.totalSentiment += sentiment;

			if (time >= 0 && time < 4) {
				accumulator.commentTime.midnight_to_four_am++;
			} else if (time >= 4 && time < 10) {
				accumulator.commentTime.four_am_to_ten_am++;
			} else if (time >= 10 && time < 14) {
				accumulator.commentTime.ten_am_to_two_pm++;
			} else if (time >= 14 && time < 18) {
				accumulator.commentTime.two_pm_to_six_pm++;
			} else if (time >= 18 && time < 21) {
				accumulator.commentTime.six_pm_to_nine_pm++;
			} else {
				accumulator.commentTime.nine_pm_to_midnight++;
			}

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
			commentTime: {
				midnight_to_four_am: 0,
				four_am_to_ten_am: 0,
				ten_am_to_two_pm: 0,
				two_pm_to_six_pm: 0,
				six_pm_to_nine_pm: 0,
				nine_pm_to_midnight: 0,
			},
		},
	);

	commentStatisticsData.sentimentStatistics.sentimentAverage =
		commentStatisticsData.sentimentStatistics.totalSentiment /
		tiktokComments.length;

	const mostWatchedVideo = tiktokVideoData.sort(
		(a, b) => b.playCount - a.playCount,
	)[0];
	const mostLikedVideo = tiktokVideoData.sort(
		(a, b) => b.diggCount - a.diggCount,
	)[0];
	const mostCommentedVideo = tiktokVideoData.sort(
		(a, b) => b.commentCount - a.commentCount,
	)[0];
	const mostOldVideo = tiktokVideoData.sort((a, b) => {
		return a.date < b.date ? -1 : 1;
	})[0];
	const mostSharedVideo = tiktokVideoData.sort(
		(a, b) => b.shareCount - a.shareCount,
	)[0];

	const oldVideoDateDiff = Math.ceil(
		Math.abs(Date.now() - new Date(mostOldVideo.date).getTime()) /
			(1000 * 60 * 60 * 24),
	);

	const dataWithEngagement = [];

	const videoEngagementData = {
		like: 0,
		comments: 0,
		views: 0,
		sentiment: commentStatisticsData.sentimentStatistics.sentimentAverage,
	};

	for (const key in tiktokVideoData) {
		videoEngagementData.like += tiktokVideoData[key].diggCount;
		videoEngagementData.comments += tiktokVideoData[key].commentCount;
		videoEngagementData.views += tiktokVideoData[key].playCount;
		const timeDiff =
			Math.abs(Date.now() - new Date(tiktokVideoData[key].date).getTime()) /
			(1000 * 60 * 60 * 24);

		const engagementSum =
			tiktokVideoData[key].diggCount * 1 +
			tiktokVideoData[key].commentCount * 1 +
			tiktokVideoData[key].shareCount * 1 +
			tiktokVideoData[key].playCount * 1;

		const dataDiffRelation = 1 - timeDiff / oldVideoDateDiff;

		const comments = data.tiktokComments.filter(
			(comment) => comment.video_id === tiktokVideoData[key].id,
		);

		let sentimentSum = 0;

		const formattedComments = [];

		for (const comment of comments) {
			const { author, sentimentAnalysis, diggCount, ...rest } = comment;
			formattedComments.push({
				...rest,
				likeCount: diggCount,
				sentimentAnalysis,
				username: author,
			});
			sentimentSum += comment.sentimentAnalysis;
		}

		const engagement =
			(engagementSum * dataDiffRelation) / (tiktokData[0].fans * timeDiff);

		dataWithEngagement.push({
			...tiktokVideoData[key],
			engagement,
			comments: formattedComments,
			sentiment: sentimentSum / comments.length,
		});
	}

	const rankByEngagement = dataWithEngagement.sort((a, b) => {
		return b.engagement - a.engagement;
	});

	const mostRankedVideo = rankByEngagement[0];

	const finalData: TiktokDataFormatterFinalDataInterface[] = [];

	for (const item of rankByEngagement) {
		const { diggCount, shareCount, ...rest } = item;
		finalData.push({
			...rest,
			like: diggCount,
			shares: shareCount,
			percentage: (item.engagement / mostRankedVideo.engagement) * 100,
		});
	}

	const commentStatisticsFinalData = {
		...commentStatisticsData,
		commentTime: [
			{
				name: "00:00 - 04:00",
				value: commentStatisticsData.commentTime.midnight_to_four_am,
			},
			{
				name: "04:00 - 10:00",
				value: commentStatisticsData.commentTime.four_am_to_ten_am,
			},
			{
				name: "10:00 - 14:00",
				value: commentStatisticsData.commentTime.ten_am_to_two_pm,
			},
			{
				name: "14:00 - 18:00",
				value: commentStatisticsData.commentTime.two_pm_to_six_pm,
			},
			{
				name: "18:00 - 21:00",
				value: commentStatisticsData.commentTime.six_pm_to_nine_pm,
			},
			{
				name: "21:00 - 23:59",
				value: commentStatisticsData.commentTime.nine_pm_to_midnight,
			},
		],
	};

	return {
		commentsStatistics: commentStatisticsFinalData,
		videoEngagementData,
		videos: finalData,
	};
};
