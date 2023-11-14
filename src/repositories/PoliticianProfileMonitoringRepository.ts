export interface PoliticianProfileMonitoringRepository {
  create(data: {
    user_id: string;
    politician_profile_id: string;
  }): Promise<void>;
}
