import { Show } from "@/types/Show";
import { TvEpisode } from "@/types/TvEpisode";
import { User } from "@/types/User";
import { UserService } from "./UserService";

const apiEndpoint = "https://localhost:7147";

export class UserShowService {
  static async addShow(user: User, show: Show) {
    user.shows = user.shows || [];
    user.shows.push(show);

    user.userShows = user.userShows || [];
    user.userShows.push({
      showId: show.id,
      episodeIds: show.episodes.map((episode) => episode.id),
    });

    (user.shows.find((s) => s.id === show.id) as Show).nextEpisode =
      UserShowService.nextEpisode(user, show);

    // POST /user/{id}/shows/
    const init = UserService.makeInit(show);
    await fetch(`${apiEndpoint}/api/Users/${user.id}/shows`, init);
  }

  static nextEpisode(user: User, show: Show): TvEpisode | undefined {
    console.log("next:showId--->", show.id);
    const watchedEpisodes = user.userShows.find(
      (s) => s.showId === show.id
    )?.episodeIds;

    const userShow = UserShowService.getUserShow(user, show.id);
    if (!userShow) {
      return;
    }

    const nextEpisode = userShow.episodes.find(
      (episode) => watchedEpisodes?.indexOf(episode.id) === -1
    );

    console.log("next--->", nextEpisode, userShow, watchedEpisodes);
    return nextEpisode;
  }

  static async removeShow(user: User, show: Show) {
    const init = UserService.makeInit(null, "DELETE");
    const userObj = await (
      await fetch(`${apiEndpoint}/api/Users/${user.id}/shows/${show.id}`, init)
    ).json();

    user.shows = userObj.shows;

    user.userShows.splice(
      user.userShows.findIndex((s) => s.showId === show.id),
      1
    );
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

    user.shows = userobj.shows;
    user.userShows = userobj.userShows;
    user.shows.forEach((show) => {
      show.nextEpisode = UserShowService.nextEpisode(user, show);
    });
  }

  static getUserShow(user: User, showId: number): Show | undefined {
    return user.shows.find((s) => s.id === showId);
  }

  static async apiRegister(username: string, email: string, password: string) {
    const init: RequestInit = UserService.makeInit({
      username,
      email,
      password,
    });

    const data = (await fetch(`${apiEndpoint}/User/register`, init)).body;
    return data;
  }
}
