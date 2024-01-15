import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import moment from "moment";
import { PoliticianProfileRepository } from "../PoliticianProfileRepository";

export class PrismaPoliticianProfileRepository
	implements PoliticianProfileRepository
{
	async findCpfList() {
		return await prisma.politicianProfile.findMany({
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

	async findByCpf(cpf: string) {
		return await prisma.politicianProfile.findUnique({
			where: {
				cpf: cpf,
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

	async findYoutubeStatistics(data: { id: string; period: number }) {
		const [current, previous] = await Promise.all([
			prisma.politicianProfile.findUnique({
				where: {
					id: data.id,
				},
				select: {
					youtubeBaseData: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
					youtubeVideoData: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
								lte: moment().toDate(),
							},
						},
					},
					youtubeCommentData: {
						where: {
							video: {
								date: {
									gte: moment().subtract(data.period, "day").toDate(),
									lte: moment().toDate(),
								},
							},
						},
					},
				},
			}),
			prisma.politicianProfile.findUnique({
				where: {
					id: data.id,
				},
				select: {
					youtubeBaseData: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					youtubeVideoData: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					youtubeCommentData: {
						where: {
							video: {
								date: {
									gte: moment()
										.subtract(data.period * 2, "day")
										.toDate(),
									lte: moment()
										.subtract(data.period + 1, "day")
										.toDate(),
								},
							},
						},
					},
				},
			}),
		]);

		return {
			current,
			previous,
		};
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

	async findFacebookStatistics(data: { id: string; period: number }) {
		const [current, previous] = await Promise.all([
			prisma.politicianProfile.findUnique({
				where: {
					id: data.id,
				},
				include: {
					facebookData: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
								lte: moment().toDate(),
							},
						},
					},
					facebookPosts: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
								lte: moment().toDate(),
							},
						},
					},
					facebookPostComments: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
								lte: moment().toDate(),
							},
						},
					},
				},
			}),
			prisma.politicianProfile.findUnique({
				where: {
					id: data.id,
				},
				include: {
					facebookData: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					facebookPosts: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					facebookPostComments: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
				},
			}),
		]);

		return {
			current,
			previous,
		};
	}

	async findTiktokStatistics(data: { id: string; period: number }) {
		const [current, previous] = await Promise.all([
			prisma.politicianProfile.findUnique({
				where: {
					id: data.id,
				},
				include: {
					tiktokData: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
					tiktokVideoData: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
					tiktokComments: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
				},
			}),
			prisma.politicianProfile.findUnique({
				where: {
					id: data.id,
				},
				include: {
					tiktokData: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					tiktokVideoData: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					tiktokComments: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
				},
			}),
		]);

		return {
			current,
			previous,
		};
	}

	async findInstagramStatistics(data: { id: string; period: number }) {
		const [current, previous] = await Promise.all([
			prisma.politicianProfile.findUnique({
				where: {
					id: data.id,
				},
				include: {
					instagramData: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
					instagramPosts: {
						where: {
							pubDate: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
					instagramPostComments: {
						where: {
							timestamp: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
				},
			}),
			prisma.politicianProfile.findUnique({
				where: {
					id: data.id,
				},
				include: {
					instagramData: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					instagramPosts: {
						where: {
							pubDate: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					instagramPostComments: {
						where: {
							timestamp: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
				},
			}),
		]);

		return {
			current,
			previous,
		};
	}

	async findSocialMediaStatistics(data: { id: string; period: number }) {
		const [current, previous] = await Promise.all([
			prisma.politicianProfile.findUnique({
				where: {
					id: data.id,
				},
				select: {
					instagramData: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
					instagramPosts: {
						where: {
							pubDate: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
					instagramPostComments: {
						where: {
							timestamp: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
					youtubeBaseData: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
					youtubeVideoData: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
								lte: moment().toDate(),
							},
						},
					},
					youtubeCommentData: {
						where: {
							video: {
								date: {
									gte: moment().subtract(data.period, "day").toDate(),
									lte: moment().toDate(),
								},
							},
						},
					},
					tiktokData: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
					tiktokVideoData: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
					tiktokComments: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
					facebookData: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
								lte: moment().toDate(),
							},
						},
					},
					facebookPosts: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
								lte: moment().toDate(),
							},
						},
					},
					facebookPostComments: {
						where: {
							date: {
								gte: moment().subtract(data.period, "day").toDate(),
								lte: moment().toDate(),
							},
						},
					},
				},
			}),
			prisma.politicianProfile.findUnique({
				where: {
					id: data.id,
				},
				select: {
					instagramData: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					instagramPosts: {
						where: {
							pubDate: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					instagramPostComments: {
						where: {
							timestamp: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					tiktokData: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					tiktokVideoData: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					tiktokComments: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					facebookData: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					facebookPosts: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					facebookPostComments: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					youtubeBaseData: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					youtubeVideoData: {
						where: {
							date: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
					youtubeCommentData: {
						where: {
							video: {
								date: {
									gte: moment()
										.subtract(data.period * 2, "day")
										.toDate(),
									lte: moment()
										.subtract(data.period + 1, "day")
										.toDate(),
								},
							},
						},
					},
				},
			}),
		]);

		return {
			current: current,
			previous: previous,
		};
	}

	async findFollowersStatistics(data: { id: string; period: number }) {
		const [previous, current] = await Promise.all([
			prisma.politicianProfile.findUnique({
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
								gte: moment().subtract(data.period, "day").toDate(),
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
								gte: moment().subtract(data.period, "day").toDate(),
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
								gte: moment().subtract(data.period, "day").toDate(),
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
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
					},
				},
			}),
			prisma.politicianProfile.findUnique({
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
								gte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
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
								gte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
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
								gte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
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
								gte: moment()
									.subtract(data.period + 1, "day")
									.toDate(),
							},
						},
					},
				},
			}),
		]);

		return {
			current: current,
			previous: previous,
		};
	}

	async findCommentsStatistics(data: { id: string; period: number }) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: data.id,
			},
			select: {
				instagramPostComments: {
					where: {
						timestamp: {
							gte: moment().subtract(data.period, "day").toDate(),
						},
					},
					select: {
						text: true,
					},
				},
				tiktokComments: {
					where: {
						date: {
							gte: moment().subtract(data.period, "day").toDate(),
						},
					},
					select: {
						text: true,
					},
				},
				facebookPostComments: {
					where: {
						date: {
							gte: moment().subtract(data.period, "day").toDate(),
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
								gte: moment().subtract(data.period, "day").toDate(),
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

	async findPostsStatistics(data: { id: string; period: number }) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: data.id,
			},
			select: {
				instagramPosts: {
					where: {
						pubDate: {
							gte: moment().subtract(data.period, "day").toDate(),
						},
					},
				},
				tiktokVideoData: {
					where: {
						date: {
							gte: moment().subtract(data.period, "day").toDate(),
						},
					},
				},
				facebookPosts: {
					where: {
						date: {
							gte: moment().subtract(data.period, "day").toDate(),
						},
					},
				},
				youtubeVideoData: {
					where: {
						date: {
							gte: moment().subtract(data.period, "day").toDate(),
						},
					},
				},
			},
		});
	}

	async findMetaAdsStatistics(data: { id: string }) {
		return await prisma.politicianProfile.findUnique({
			where: {
				id: data.id,
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

	async findMentionsStatistics(data: { id: string; period: number }) {
		const [current, previous] = await Promise.all([
			prisma.politicianProfile.findUnique({
				where: {
					id: data.id,
				},
				select: {
					news: {
						where: {
							news: {
								last_update: {
									gte: moment().subtract(data.period, "day").toDate(),
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
								gte: moment().subtract(data.period, "day").toDate(),
							},
						},
						include: {
							comments: true,
						},
					},
				},
			}),
			prisma.politicianProfile.findUnique({
				where: {
					id: data.id,
				},
				select: {
					instagramMention: {
						where: {
							pubDate: {
								gte: moment()
									.subtract(data.period * 2, "day")
									.toDate(),
								lte: moment().subtract(data.period, "day").toDate(),
							},
						},
						include: {
							comments: true,
						},
					},
					news: {
						where: {
							news: {
								last_update: {
									gte: moment()
										.subtract(data.period * 2, "day")
										.toDate(),
									lte: moment().subtract(data.period, "day").toDate(),
								},
							},
						},
						include: {
							news: true,
						},
					},
				},
			}),
		]);

		return { current, previous };
	}
}
