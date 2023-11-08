export interface createManyYoutubeBaseDataInterface {
  id: string;
  channelData: {
    channelName: string;
    channelTotalViews: number;
    channelTotalSubscribers: number;
    channelTotalVideos: number;
    date: Date;
  };
}

export interface YoutubeBaseDataRepository {
  createMany(data: createManyYoutubeBaseDataInterface[]): Promise<void>;
}
