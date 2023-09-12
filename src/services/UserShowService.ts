import { Show } from "@/types/Show";
import { TvEpisode } from "@/types/TvEpisode";
import { User } from "@/types/User";
import { UserService } from "./UserService";

const apiEndpoint = "http://localhost:5292";

export class UserShowService {
  static async apiRegister(username: string, email: string, password: string) {
    const init: RequestInit = UserService.makeInit({
      username,
      email,
      password,
    });

    const data = (await fetch(`${apiEndpoint}/User/register`, init)).body;
    return data;
  }

  static async addShow(user: User, show: Show) {
    const init = UserService.makeInit(show);
    const userAny = await (
      await fetch(`${apiEndpoint}/api/Users/${user.id}/shows`, init)
    ).json();
    console.log("userAny--->", userAny);

    UserShowService.setUserShows(user, userAny);
  }

  static async removeShow(user: User, show: Show) {
    const init = UserService.makeInit(null, "DELETE");
    const userObj = await (
      await fetch(`${apiEndpoint}/api/Users/${user.id}/shows/${show.id}`, init)
    ).json();
    console.log("userAny--->", userObj);

    UserShowService.setUserShows(user, userObj);
  }

  static async watchedEpisode(
    user: User,
    episode: TvEpisode,
    isWatched: boolean
  ) {
    const init = UserService.makeInit(null);
    const userobj = await (
      await fetch(
        `${apiEndpoint}/api/Users/${user.id}/watched/${episode.id}?isWatched=${isWatched}`,
        init
      )
    ).json();

    UserShowService.setUserShows(user, userobj);
  }

  static setUserShows(user: User, userAny: any) {
    user.userShows = userAny.userShows;
    user.shows = userAny.shows;
    user.shows.forEach((show) => {
      show.nextEpisode = UserShowService.nextEpisode(user, show);
      show.episodes.forEach((episode) => {
        episode.watchedDate = user.userShows.find(
          (us) =>
            us.episodeIds !== null && us.episodeIds.indexOf(episode.id) !== -1
        )
          ? new Date()
          : undefined;
      });
    });
  }

  static nextEpisode(user: User, show: Show): TvEpisode | undefined {
    console.log("next:showId--->", show.id);
    const watchedEpisodes = user.userShows.find(
      (s) => s.showId === show.id
    )?.episodeIds;

    const userShow = user.shows.find((s) => s.id === show.id);
    if (!userShow) {
      return;
    }

    const nextEpisode = userShow.episodes.find(
      (episode) => watchedEpisodes?.indexOf(episode.id) === -1
    );

    console.log("next--->", nextEpisode, userShow, watchedEpisodes);
    return nextEpisode;
  }
}
