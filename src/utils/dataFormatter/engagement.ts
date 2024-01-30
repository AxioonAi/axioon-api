export const EngagementDataFormatter = (data: {
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
	youtubeVideoData: {
		id: string;
		title: string;
		url: string;
		duration: string;
		viewCount: number;
		commentsCount: number;
		likes: number;
		date: Date;
		description: string;
		imgUrl: string;
	}[];
}) => {
	const engagement = {
		facebook: 0,
		instagram: 0,
		tiktok: 0,
		youtube: 0,
	};

	for (const item of data.facebookPosts) {
		engagement.facebook += item.like;
		engagement.facebook += item.comments;
		engagement.facebook += item.shares;
	}

	for (const item of data.instagramPosts) {
		engagement.instagram += item.likeCount;
		engagement.instagram += item.commentCount;
	}

	for (const item of data.tiktokVideoData) {
		engagement.tiktok += item.diggCount;
		engagement.tiktok += item.commentCount;
		engagement.tiktok += item.playCount;
	}

	for (const item of data.youtubeVideoData) {
		engagement.youtube += item.likes;
		engagement.youtube += item.commentsCount;
		engagement.youtube += item.viewCount;
	}

	return engagement;
};
