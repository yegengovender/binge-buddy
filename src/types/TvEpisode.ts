export interface TvEpisode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  runtime: number;
  rating: number;
  image: string;
  summary: string;
  showId: number;
  watchedDate?: Date;
}
