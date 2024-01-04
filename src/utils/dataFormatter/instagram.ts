import { InstagramDataFormatterFinalDataInterface } from "@/@types/useCaseInterfaces";

export const instagramDataFormatter = (data: {
	instagramData: {
		id: string;
		followers: number;
		follows: number;
		posts_count: number;
		profile_picture: string;
		reels_count: number;
	}[];
	instagramPosts: {
		id: string;
		postUrl: string;
		description: string;
		commentCount: number;
		likeCount: number;
		pubDate: Date;
		viewCount: number;
		playCount: number;
	}[];
	instagramPostComments: {
		id: string;
		text: string;
		post_id: string;
		ownerUsername: string;
		ownerProfilePicUrl: string;
		timestamp: string;
		likeCount: number;
		sentimentAnalysis: number;
	}[];
}) => {
	const { instagramData, instagramPosts, instagramPostComments } = data;

	const currentFacebookData = instagramData[0];

	const commentStatisticsData = instagramPostComments.reduce(
		(accumulator, comment) => {
			const sentiment = comment.sentimentAnalysis;
			const time = new Date(comment.timestamp).getHours();

			// Calcula a média
			accumulator.sentimentStatistics.totalSentiment += sentiment;

			// Conta a quantidade de comentários em diferentes faixas de tempo
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
		instagramPostComments.length;

	const mostLikedPost = instagramPosts.sort(
		(a, b) => b.likeCount - a.commentCount,
	)[0];
	const mostCommentedPost = instagramPosts.sort(
		(a, b) => b.commentCount - a.commentCount,
	)[0];
	const mostOldPost = instagramPosts.sort((a, b) => {
		return a.pubDate < b.pubDate ? -1 : 1;
	})[0];

	const oldPostDateDiff = Math.ceil(
		Math.abs(Date.now() - new Date(mostOldPost.pubDate).getTime()) /
			(1000 * 60 * 60 * 24),
	);

	const dataWithEngagement = [];

	const postEngagementData = {
		like: 0,
		comments: 0,
		sentiment: commentStatisticsData.sentimentStatistics.sentimentAverage,
	};

	for (const key in instagramPosts) {
		postEngagementData.like += instagramPosts[key].likeCount;
		postEngagementData.comments += instagramPosts[key].commentCount;

		const timeDiff =
			Math.abs(Date.now() - new Date(instagramPosts[key].pubDate).getTime()) /
			(1000 * 60 * 60 * 24);

		const engagementSum =
			instagramPosts[key].commentCount * 1 + instagramPosts[key].likeCount * 1;

		const dateDiffRelation = 1 - timeDiff / oldPostDateDiff;

		const comments = data.instagramPostComments.filter(
			(comment) => comment.post_id === data.instagramPosts[key].id,
		);

		const formattedComments = comments.map((comment) => {
			const { ownerUsername, ...rest } = comment;
			return {
				...rest,
				username: ownerUsername,
			};
		});

		let sentimentSum = 0;

		for (const comment of comments) {
			sentimentSum += comment.sentimentAnalysis;
		}

		const engagement =
			(engagementSum * dateDiffRelation) /
			100 /
			(currentFacebookData.followers / 1000);

		dataWithEngagement.push({
			...instagramPosts[key],
			engagement,
			comments: formattedComments,
			sentiment: sentimentSum / comments.length,
		});
	}

	const rankByEngagement = dataWithEngagement.sort((a, b) => {
		return b.engagement - a.engagement;
	});

	const mostRankedPost = rankByEngagement[0];

	const finalData: InstagramDataFormatterFinalDataInterface[] = [];

	for (const item of rankByEngagement) {
		const { likeCount, ...rest } = item;
		finalData.push({
			...rest,
			like: likeCount,
			percentage: (item.engagement / mostRankedPost.engagement) * 100,
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
		commentStatistics: commentStatisticsFinalData,
		postEngagementData,
		posts: finalData,
	};
};
