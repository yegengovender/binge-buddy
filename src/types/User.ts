import { IUser } from "./IUser";
import { Show } from "./Show";
import { TvEpisode } from "./TvEpisode";
import { UserShow } from "./UserShow";

export class User implements IUser {
  id: number;
  name: string;
  email: string;
  loggedIn: boolean;
  shows: Show[];
  userShows: UserShow[];

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.loggedIn = false;
    this.shows = [];
    this.userShows = [];
  }

  nextEpisode(show: Show): TvEpisode | undefined {
    const userShow = this.shows.find((s) => s.id === show.id);
    if (!userShow) return undefined;

    const showData = this.userShows.find((s) => s.showId === show.id);
    if (!showData) return undefined;

    const progress = showData.progress || [];

    const nextEpisode = userShow.episodes.find((episode) => {
      const episodeProgress = progress.find(
        (p) => p.season === episode.season && p.episode === episode.number
      );
      return !episodeProgress;
    });

    return show.episodes.find((episode) => episode.id === nextEpisode?.id);
  }
}
