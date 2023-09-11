import { Show } from "@/types/Show";
import { TvEpisode } from "@/types/TvEpisode";
import { User } from "@/types/User";
import { UserService } from "./UserService";

const apiEndpoint = "http://localhost:5292";

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

  private static nextEpisode(user: User, show: Show): TvEpisode | undefined {
    console.log("next:showId--->", show.id);
    const userShow = UserShowService.getUserShow(user, show.id);
    if (!userShow) {
      return;
    }

    const nextEpisode = userShow.episodes.find(
      (episode) => episode.watchedDate === (null || undefined)
    );

    console.log("next--->", nextEpisode);
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

  static watchedEpisode(user: User, episode: TvEpisode, isWatched: boolean) {
    // POST /user/episodes/{id}/watched

    // const data = await fetch(`https://api.binge-buddy.com/shows/${showId}/episodes`);
    // let results = await data.json();
    // results = results.map((episode: any) =>
    //   TvService.toEpisodeObject(episode, showId)
    // );
    // return results;

    const userShow = UserShowService.getUserShow(user, episode.showId);
    if (!userShow) return;

    const userEpisode = userShow.episodes.find((e) => e.id === episode.id);
    if (!userEpisode) return;

    userEpisode.watchedDate = isWatched ? new Date() : undefined;
    userShow.nextEpisode = UserShowService.nextEpisode(user, userShow);
    console.log("watched -->", userEpisode, isWatched);
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
