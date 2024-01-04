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
		facebook: {
			likes: 0,
			comments: 0,
			shares: 0,
		},
		instagram: {
			likes: 0,
			comments: 0,
		},
		tiktok: {
			digg: 0,
			comments: 0,
			play: 0,
		},
		youtube: {
			likes: 0,
			comments: 0,
			views: 0,
		},
	};

	for (const item of data.facebookPosts) {
		engagement.facebook.likes += item.like;
		engagement.facebook.comments += item.comments;
		engagement.facebook.shares += item.shares;
	}

	for (const item of data.instagramPosts) {
		engagement.instagram.likes += item.likeCount;
		engagement.instagram.comments += item.commentCount;
	}

	for (const item of data.tiktokVideoData) {
		engagement.tiktok.digg += item.diggCount;
		engagement.tiktok.comments += item.commentCount;
		engagement.tiktok.play += item.playCount;
	}

	for (const item of data.youtubeVideoData) {
		engagement.youtube.likes += item.likes;
		engagement.youtube.comments += item.commentsCount;
		engagement.youtube.views += item.viewCount;
	}

	return engagement;
};
