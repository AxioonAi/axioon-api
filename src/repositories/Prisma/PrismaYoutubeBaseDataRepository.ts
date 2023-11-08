import { prisma } from "@/lib/prisma";
import {
  YoutubeBaseDataRepository,
  createManyYoutubeBaseDataInterface,
} from "../YoutubeBaseDataRepository";

export class PrismaYoutubeBaseDataRepository
  implements YoutubeBaseDataRepository
{
  async createMany(data: createManyYoutubeBaseDataInterface[]) {
    const createData = data.map((item) => ({
      user_id: item.id,
      channel_name: item.channelData.channelName,
      channel_total_views: item.channelData.channelTotalViews,
      channel_total_subs: item.channelData.channelTotalSubscribers,
      date: item.channelData.date,
      channel_total_videos: item.channelData.channelTotalVideos,
    }));

    await prisma.youtubeBaseData.createMany({
      data: createData,
    });
  }
}
