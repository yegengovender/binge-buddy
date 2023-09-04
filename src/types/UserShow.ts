import { ShowsProgress } from "./ShowsProgress";


export interface UserShow {
  showId: number;
  lastEpisode?: number;
  episodeIds: number[];
  progress?: ShowsProgress[];
}
