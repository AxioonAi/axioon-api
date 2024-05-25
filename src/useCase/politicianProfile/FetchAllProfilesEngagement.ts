import { PoliticianProfileMonitoringRepository } from "@/repositories/PoliticianProfileMonitoringRepository";
import { PoliticianProfileRepository } from "@/repositories/PoliticianProfileRepository";
import { PoliticianProfile, PoliticianProfileMonitoring } from "@prisma/client";

interface FetchAllProfilesEngagementUseCaseRequest {
  userId: string;
}

interface FetchAllProfilesEngagementUseCaseResponse {
  profiles: any | null;
  categories: string[];
}

export class FetchAllProfilesEngagementUseCase {
  constructor(
    private politicianProfileRepository: PoliticianProfileRepository,
    private politicianProfileMonitoringRepository: PoliticianProfileMonitoringRepository
  ) {}

  async execute({
    userId,
  }: FetchAllProfilesEngagementUseCaseRequest): Promise<FetchAllProfilesEngagementUseCaseResponse> {
    const profiles =
      await this.politicianProfileMonitoringRepository.findManyByUserIdWithPosts(
        userId
      );

    const finalProfile: any = [];
    const days: string[] = [];

    for (const profile of profiles) {
      const instagramByDate: number[] = [0, 0, 0, 0, 0, 0];
      const facebookByDate: number[] = [0, 0, 0, 0, 0, 0];
      const tiktokByDate: number[] = [0, 0, 0, 0, 0, 0];
      const youtubeByDate: number[] = [0, 0, 0, 0, 0, 0];

      profile.politicianProfile.instagramPosts.forEach((item) => {
        const dia = new Date(item.pubDate).getDate();
        const intervalo = Math.floor((dia - 1) / 5) + 1;
        const chaveGrupo = `Dia ${intervalo * 5 - 4} a ${intervalo * 5}`;

        if (!days.includes(chaveGrupo)) {
          days.push(chaveGrupo);
        }

        const index = days.indexOf(chaveGrupo);

        instagramByDate[index] += item.commentCount * 1 + item.likeCount * 0.5;
      });
      profile.politicianProfile.facebookPosts.forEach((item) => {
        const dia = new Date(item.date).getDate();
        const intervalo = Math.floor((dia - 1) / 5) + 1;
        const chaveGrupo = `Dia ${intervalo * 5 - 4} a ${intervalo * 5}`;
        if (!days.includes(chaveGrupo)) {
          days.push(chaveGrupo);
        }

        const index = days.indexOf(chaveGrupo);

        facebookByDate[index] +=
          item.comments * 1 + item.like * 0.5 + item.shares * 1.5;
      });
      profile.politicianProfile.tiktokVideoData.forEach((item) => {
        const dia = new Date(item.date).getDate();
        const intervalo = Math.floor((dia - 1) / 5) + 1;
        const chaveGrupo = `Dia ${intervalo * 5 - 4} a ${intervalo * 5}`;
        if (!days.includes(chaveGrupo)) {
          days.push(chaveGrupo);
        }

        const index = days.indexOf(chaveGrupo);

        tiktokByDate[index] +=
          item.diggCount * 0.5 +
          item.commentCount * 1 +
          item.shareCount * 1.5 +
          item.playCount * 0.2;
      });
      profile.politicianProfile.youtubeVideoData.forEach((item) => {
        const dia = new Date(item.date).getDate();
        const intervalo = Math.floor((dia - 1) / 5) + 1;
        const chaveGrupo = `Dia ${intervalo * 5 - 4} a ${intervalo * 5}`;

        if (!days.includes(chaveGrupo)) {
          days.push(chaveGrupo);
        }

        const index = days.indexOf(chaveGrupo);

        youtubeByDate[index] +=
          item.commentsCount * 1.5 + item.likes * 1 + item.viewCount * 0.5;
      });

      const finalData = [
        instagramByDate[0] +
          facebookByDate[0] +
          tiktokByDate[0] +
          youtubeByDate[0],
        instagramByDate[1] +
          facebookByDate[1] +
          tiktokByDate[1] +
          youtubeByDate[1],
        instagramByDate[2] +
          facebookByDate[2] +
          tiktokByDate[2] +
          youtubeByDate[2],
        instagramByDate[3] +
          facebookByDate[3] +
          tiktokByDate[3] +
          youtubeByDate[3],
        instagramByDate[4] +
          facebookByDate[4] +
          tiktokByDate[4] +
          youtubeByDate[4],
        instagramByDate[5] +
          facebookByDate[5] +
          tiktokByDate[5] +
          youtubeByDate[5],
      ];

      finalProfile.push({
        name: profile.politicianProfile.social_name,
        data: finalData,
      });
    }

    const result: any = [];

    // finalProfile.forEach((profile) => {
    //   const dates = new Set([
    //     ...Object.keys(profile.instagram || {}),
    //     ...Object.keys(profile.facebook || {}),
    //     ...Object.keys(profile.tiktok || {}),
    //     ...Object.keys(profile.youtube || {}),
    //   ]);

    //   dates.forEach((date) => {
    //     const existingEntry = result.find((entry) => entry.date === date);
    //     const socialData = {
    //       name: profile.name,
    //       facebook: profile.facebook[date] || {},
    //       instagram: profile.instagram[date] || {},
    //       tiktok: profile.tiktok[date] || {},
    //       youtube: profile.youtube[date] || {},
    //     };

    //     if (existingEntry) {
    //       existingEntry.profiles.push(socialData);
    //     } else {
    //       result.push({
    //         date,
    //         profiles: [socialData],
    //       });
    //     }
    //   });
    // });

    return {
      profiles: finalProfile,
      categories: days,
    };
  }
}
