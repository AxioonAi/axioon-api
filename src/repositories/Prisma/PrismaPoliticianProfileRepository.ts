import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import moment from "moment";
import { PoliticianProfileRepository } from "../PoliticianProfileRepository";
import { StatisticsData } from "@/@types/politicianProfileRepository";

export class PrismaPoliticianProfileRepository
	implements PoliticianProfileRepository
{
	async findCpfList() {
		return await prisma.politicianProfile.findMany({
			where: {
				cpf: {
					not: null,
				},
			},
			select: {
				cpf: true,
				id: true,
			},
		});
	}

	async create(data: {
		cpf: string;
		instagram: string;
		social_name: string;
		city_id: string;
		full_name: string;
		youtube?: string;
		tiktok?: string;
		facebook?: string;
		role: Role;
		political_group_id: string;
	}) {
		return await prisma.politicianProfile.create({
			data,
		});
	}

	async profileExists(data: {
		cpf?: string;
		facebook?: string;
		youtube?: string;
		tiktok?: string;
		instagram?: string;
		fullName?: string;
	}) {
		return await prisma.politicianProfile.findFirst({
			where: {
				OR: [
					{
						cpf: data.cpf,
					},
					{
						facebook: data.facebook,
					},
					{
						youtube: data.youtube,
					},
					{
						tiktok: data.tiktok,
					},
					{
						instagram: data.instagram,
					},
					{
						full_name: data.fullName,
					},
				],
			},
		});
	}

	async findUserCity(id: string) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id,
			},
			include: {
				city: {
					include: {
						IBGEData: true,
						pollingPlace: true,
						electorate: true,
						politician: {
							where: {
								id: {
									not: id,
								},
							},
						},
					},
				},
			},
		});
	}

	async findYoutubeChannelList() {
		return await prisma.politicianProfile.findMany({
			where: {
				youtube: {
					not: null,
				},
			},
			select: {
				youtube: true,
				id: true,
			},
		});
	}

	async findInstagramList() {
		return await prisma.politicianProfile.findMany({
			select: {
				instagram: true,
				id: true,
			},
		});
	}

	async findTikTokList() {
		return await prisma.politicianProfile.findMany({
			where: {
				tiktok: {
					not: null,
				},
			},
			select: {
				tiktok: true,
				id: true,
			},
		});
	}

	async findFacebookList() {
		return await prisma.politicianProfile.findMany({
			where: {
				facebook: {
					not: null,
				},
			},
			select: {
				facebook: true,
				id: true,
			},
		});
	}

	async findYoutubeStatistics(data: StatisticsData) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: data.id,
			},
			select: {
				youtubeBaseData: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				youtubeVideoData: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				youtubeCommentData: {
					where: {
						video: {
							date: {
								gte: data.gte,
								lte: data.lte,
							},
						},
					},
				},
			},
		});
	}

	async findNamesAndRoles() {
		return await prisma.politicianProfile.findMany({
			include: {
				facebookData: {
					take: 1,
					select: {
						title: true,
					},
				},
			},
		});
	}

	async findByState(state: string) {
		return await prisma.politicianProfile.findMany({
			where: {
				city: {
					state: state,
				},
			},
			select: {
				social_name: true,
				id: true,
			},
		});
	}

	async findFacebookStatistics(data: StatisticsData) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: data.id,
			},
			select: {
				facebookData: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				facebookPostComments: {
					where: {
						post: {
							date: {
								gte: data.gte,
								lte: data.lte,
							},
						},
					},
				},
				facebookPosts: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
			},
		});
	}

	async findTiktokStatistics(data: StatisticsData) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: data.id,
			},
			select: {
				tiktokData: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				tiktokVideoData: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				tiktokComments: {
					where: {
						video: {
							date: {
								gte: data.gte,
								lte: data.lte,
							},
						},
					},
				},
			},
		});
	}

	async findInstagramStatistics(data: StatisticsData) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: data.id,
			},
			select: {
				instagramData: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				instagramPosts: {
					where: {
						pubDate: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				instagramPostComments: {
					where: {
						timestamp: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
			},
		});
	}

	async findSocialMediaStatistics(data: StatisticsData) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: data.id,
			},
			select: {
				instagramData: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				instagramPosts: {
					where: {
						pubDate: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				instagramPostComments: {
					where: {
						timestamp: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				youtubeBaseData: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				youtubeVideoData: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				youtubeCommentData: {
					where: {
						video: {
							date: {
								gte: data.gte,
								lte: data.lte,
							},
						},
					},
				},
				tiktokData: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				tiktokVideoData: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				tiktokComments: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				facebookData: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				facebookPosts: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				facebookPostComments: {
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
			},
		});
	}

	async findFollowersStatistics(data: StatisticsData) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: data.id,
			},
			select: {
				instagramData: {
					orderBy: {
						date: "asc",
					},
					take: 1,
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				tiktokData: {
					orderBy: {
						date: "asc",
					},
					take: 1,
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				facebookData: {
					orderBy: {
						date: "asc",
					},
					take: 1,
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
				youtubeBaseData: {
					orderBy: {
						date: "asc",
					},
					take: 1,
					where: {
						date: {
							gte: data.gte,
							lte: data.lte,
						},
					},
				},
			},
		});
	}

	async findCommentsStatistics(data: StatisticsData) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: data.id,
			},
			select: {
				instagramPostComments: {
					where: {
						timestamp: {
							gte: data.gte,
						},
					},
					select: {
						text: true,
					},
				},
				tiktokComments: {
					where: {
						date: {
							gte: data.gte,
						},
					},
					select: {
						text: true,
					},
				},
				facebookPostComments: {
					where: {
						date: {
							gte: data.gte,
						},
					},
					select: {
						text: true,
					},
				},
				youtubeCommentData: {
					where: {
						video: {
							date: {
								gte: data.gte,
							},
						},
					},
					select: {
						text: true,
					},
				},
			},
		});
	}

	async findPostsStatistics(data: StatisticsData) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: data.id,
			},
			select: {
				instagramPosts: {
					where: {
						pubDate: {
							gte: data.gte,
						},
					},
				},
				tiktokVideoData: {
					where: {
						date: {
							gte: data.gte,
						},
					},
				},
				facebookPosts: {
					where: {
						date: {
							gte: data.gte,
						},
					},
				},
				youtubeVideoData: {
					where: {
						date: {
							gte: data.gte,
						},
					},
				},
			},
		});
	}

	async findMetaAdsStatistics(id: string) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: id,
			},
			select: {
				advertising: {
					include: {
						deliveryByRegion: true,
						demographicDistribution: true,
					},
				},
			},
		});
	}

	async findMentionsStatistics(data: StatisticsData) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: data.id,
			},
			select: {
				news: {
					where: {
						news: {
							last_update: {
								gte: data.gte,
								lte: data.lte,
							},
						},
					},
					include: {
						news: true,
					},
				},
				instagramMention: {
					where: {
						pubDate: {
							gte: data.gte,
							lte: data.lte,
						},
					},
					include: {
						comments: true,
					},
				},
			},
		});
	}

	async findLegalDetails(id: string) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: id,
			},
			include: {
				legalData: true,
				personalData: true,
				address: true,
				economicRelationship: true,
				incomeTax: true,
			},
		});
	}
}
