export interface createManyYoutubeBaseDataInterface {
  channel_name: string;
  channel_total_views: number;
  channel_total_subs: number;
  channel_total_videos: number;
  date: Date;
  id: string;
  politician_id: string;
}

export interface YoutubeBaseDataRepository {
  createMany(data: createManyYoutubeBaseDataInterface[]): Promise<void>;
}
