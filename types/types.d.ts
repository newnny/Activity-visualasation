
export type selectedDates = {
  startDate: Date;
  endDate: Date;
}


//Strava API response data type
export interface SortedData {
  [key: string]: ActivitiesInterface[];
}
export interface TokenAndActivities {
token_expiring_date: number;
activities: ActivitiesInterface[]
}
export type TokenBody = {
  after: number;
  before: number;
};

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

//Chart types
type dimensions = {
  height: number;
    width: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
}
