export interface CreateNewsInterface {
  title: string;
  last_update: Date;
  website_id: string | null;
  url: string;
  users: {
    politician_id: string;
    sentimentAnalysis: number;
  }[];
}

export interface NewsRepository {
  createMany(data: CreateNewsInterface[]): Promise<void>;
  newsExists(urls: string[]): Promise<string[]>;
}
