import { Show } from "@/types/Show";
import { TvEpisode } from "@/types/TvEpisode";
import { User } from "@/types/User";
import { UserShow } from "@/types/UserShow";

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
    console.log("trying next", user);
    const userShow = user.shows.find((s) => s.id === show.id);
    if (!userShow) {
      console.log("no user show");
      return undefined;
    }

    const showData = user.userShows.find((s) => s.showId === show.id);
    if (!showData) {
      console.log("no show data");
      return undefined;
    }

    const progress = showData.progress || [];

    const nextEpisode = showData.progress
      ? userShow.episodes.find(
          (episode) =>
            !progress.find(
              (p) => p.season === episode.season && p.episode === episode.number
            )
        )
      : userShow.episodes[0];

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
    const userShow = user.userShows.find(
      (userShow) => userShow.showId === episode.showId
    ) as UserShow;
    userShow.progress = userShow.progress || [];
    userShow.progress.push({
      show: episode.showId,
      season: episode.season,
      episode: episode.number,
      updated: new Date(),
    });

    const show = user.shows.find((s) => s.id === episode.showId);
    if (!show) return;

    (user.shows.find((s) => s.id === show.id) as Show).nextEpisode =
      UserService.nextEpisode(user, show);
    console.log(user);
  }
}
