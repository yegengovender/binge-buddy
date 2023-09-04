import { TvEpisode } from "./TvEpisode";
import { Season } from "./Season";

export interface Show {
  id: number;
  name: string;
  language: string;
  summary: string;
  status: string;
  premiered: string;
  rating: number;
  image: string;
  imageLarge: string;
  episodes: TvEpisode[];
  seasons: Season[];
  nextEpisode?: TvEpisode;
}
