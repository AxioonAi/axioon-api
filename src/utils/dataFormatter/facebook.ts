import { FacebookDataFormatterFinalDataInterface } from "@/@types/useCaseInterfaces";

export const FacebookDataFormatter = (data: {
	facebookData: {
		id: string;
		title: string;
		likes_count: number;
		followers_count: number;
	}[];
	facebookPosts: {
		id: string;
		url: string;
		text: string;
		date: Date;
		like: number;
		comments: number;
		shares: number;
		thumbnail: string;
	}[];
	facebookPostComments: {
		id: string;
		postUrl: string;
		text: string;
		likeCount: number;
		date: Date;
		username: string;
		post_id: string;
		politician_id: string;
		sentimentAnalysis: number;
	}[];
}) => {
	const { facebookData, facebookPosts, facebookPostComments } = data;

	const currentFacebookData = facebookData[0];

	const commentStatisticsData = facebookPostComments.reduce(
		(accumulator, comment) => {
			const sentiment = comment.sentimentAnalysis;
			const time = new Date(comment.date).getHours();

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
		facebookPostComments.length;

	const mostOldPost = facebookPosts.sort((a, b) => {
		return a.date < b.date ? -1 : 1;
	})[0];

	const oldPostDateDiff = Math.ceil(
		Math.abs(Date.now() - new Date(mostOldPost.date).getTime()) /
			(1000 * 60 * 60 * 24),
	);

	const dataWithEngagement = [];

	const postEngagementData = {
		like: 0,
		comments: 0,
		shares: 0,
		sentiment: commentStatisticsData.sentimentStatistics.sentimentAverage,
	};

	for (const key in facebookPosts) {
		postEngagementData.like += facebookPosts[key].like;
		postEngagementData.comments += facebookPosts[key].comments;
		postEngagementData.shares += facebookPosts[key].shares;

		const timeDiff =
			Math.abs(Date.now() - new Date(facebookPosts[key].date).getTime()) /
			(1000 * 60 * 60 * 24);

		const engagementSum =
			facebookPosts[key].comments * 1 +
			facebookPosts[key].like * 1 +
			facebookPosts[key].shares * 1;

		const dateDiffRelation = 1 - timeDiff / oldPostDateDiff;

		const comments = data.facebookPostComments.filter(
			(comment) => comment.post_id === data.facebookPosts[key].id,
		);

		let sentimentSum = 0;

		for (const comment of comments) {
			sentimentSum += comment.sentimentAnalysis;
		}

		const engagement =
			(engagementSum * dateDiffRelation) /
			100 /
			(currentFacebookData.followers_count / 1000);

		dataWithEngagement.push({
			...facebookPosts[key],
			engagement,
			comments,
			sentiment: sentimentSum / comments.length,
		});
	}

	const rankByEngagement = dataWithEngagement.sort((a, b) => {
		return b.engagement - a.engagement;
	});

	const mostRankedPost = rankByEngagement[0];

	const finalData: FacebookDataFormatterFinalDataInterface[] = [];
	for (const item of rankByEngagement) {
		finalData.push({
			...item,
			percentage: (item.engagement / mostRankedPost.engagement) * 100,
		});
	}

	return {
		commentStatistics: commentStatisticsData,
		postEngagementData,
		posts: finalData,
	};
};
