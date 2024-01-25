export interface FacebookDataFormatterFinalDataInterface {
	percentage: number;
	engagement: number;
	comments: {
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
	sentiment: number;
	id: string;
	url: string;
	text: string;
	date: Date;
	like: number;
	shares: number;
	thumbnail: string;
}

export interface YoutubeDataFormatterFinalDataInterface {
	percentage: number;
	engagement: number;
	comments: {
		id: string;
		text: string;
		likeCount: number;
		replyCount: number;
		username: string;
		video_id: string;
		sentimentAnalysis: number;
	}[];
	sentiment: number;
	id: string;
	title: string;
	url: string;
	duration: string;
	views: number;
	commentCount: number;
	like: number;
	date: Date;
	description: string;
	imgUrl: string;
}

export interface TiktokDataFormatterFinalDataInterface {
	percentage: number;
	engagement: number;
	comments: {
		id: string;
		likeCount: number;
		date: Date;
		replyCount: number;
		username: string;
		video_id: string;
		text: string;
		sentimentAnalysis: number;
	}[];
	sentiment: number;
	id: string;
	text: string;
	url: string;
	like: number;
	commentCount: number;
	shares: number;
	playCount: number;
	date: Date;
}

export interface InstagramDataFormatterFinalDataInterface {
	percentage: number;
	engagement: number;
	comments: {
		id: string;
		text: string;
		post_id: string;
		username: string;
		ownerProfilePicUrl: string;
		timestamp: Date;
		likeCount: number;
		sentimentAnalysis: number;
	}[];
	sentiment: number;
	id: string;
	postUrl: string;
	description: string;
	commentCount: number;
	like: number;
	pubDate: Date;
	viewCount: number;
	playCount: number;
}

export interface CommentWordCountDataInterface {
	instagramPostComments: {
		text: string;
	}[];
	facebookPostComments: {
		text: string;
	}[];
	tiktokComments: {
		text: string;
	}[];
	youtubeCommentData: {
		text: string;
	}[];
}
