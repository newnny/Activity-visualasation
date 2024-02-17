export type Token = {
  expires_at: number;
  refresh_token: string;
  access_token: string;
};

export interface ActivitiesInterface {
  id: number;
  sport_type: string;
  name: string;
  start_date: string;
  distance: number;
  average_speed: number;
  max_speed: number;
  map: {
    id: string;
    summary_polyline: string;
  };
}

export type TokenBody = {
  after: number;
  before: number;
};
