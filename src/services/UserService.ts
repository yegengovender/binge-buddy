import { Show } from "@/types/Show";
import { TvEpisode } from "@/types/TvEpisode";
import { User } from "@/types/User";
import { UserShow } from "@/types/UserShow";
import { UserShowsService } from "./UserShowsService";

export class UserService {
  static addShow(user: User, show: Show) {
    user.shows = user.shows || [];
    user.shows.push(show);

    user.userShows = user.userShows || [];
    user.userShows.push({
      showId: show.id,
      episodeIds: show.episodes.map((episode) => episode.id),
    });

    (user.shows.find((s) => s.id === show.id) as Show).nextEpisode =
      UserService.nextEpisode(user, show);
  }

  private static nextEpisode(user: User, show: Show): TvEpisode | undefined {
    const userShow = UserShowsService.getUserShow(user, show.id);
    if (!userShow) {
      return;
    }

    const nextEpisode = userShow.episodes.find(
      (episode) => episode.watchedDate === undefined
    );

    console.log("next--->", nextEpisode);
    return nextEpisode;
  }

  static removeShow(user: User, show: Show) {
    user.shows.splice(
      user.shows.findIndex((s) => s.id === show.id),
      1
    );

    user.userShows.splice(
      user.userShows.findIndex((s) => s.showId === show.id),
      1
    );
  }

  static watchedEpisode(user: User, episode: TvEpisode, isWatched: boolean) {
    const userShow = UserShowsService.getUserShow(user, episode.showId);
    if (!userShow) return;

    const userEpisode = userShow.episodes.find((e) => e.id === episode.id);
    if (!userEpisode) return;

    userEpisode.watchedDate = isWatched ? new Date() : undefined;
    userShow.nextEpisode = UserService.nextEpisode(user, userShow);
    console.log("watched -->", userEpisode, isWatched);
  }
}
