import { Show } from "@/types/Show";
import { TvEpisode } from "@/types/TvEpisode";
import { Season } from "@/types/Season";

export class TvService {
  private static readonly DefaultImage =
    "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";

  static async getShow(showId: number): Promise<Show> {
    const data = await fetch(`https://api.tvmaze.com/shows/${showId}`);
    const show = await data.json();
    return TvService.toShowObject(show);
  }

  static async doSearch(searchText: string): Promise<Show[]> {
    const data = await fetch(
      `https://api.tvmaze.com/search/shows?q=${searchText}`
    );
    let results = await data.json();
    results = results.map((show: any) => TvService.toShowObject(show.show));
    return results;
  }

  private static toShowObject(show: any): Show {
    return {
      ...show,
      rating: show.rating?.average || -1,
      image: show.image?.medium || TvService.DefaultImage,
      imageLarge: show.image?.original || TvService.DefaultImage,
    } as Show;
  }

  static async getEpisodes(showId: number): Promise<TvEpisode[]> {
    const data = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
    let results = await data.json();
    results = results.map((episode: any) =>
      TvService.toEpisodeObject(episode, showId)
    );
    return results;
  }

  // eslint-disable-next-line-no-any
  private static toEpisodeObject(episode: any, showId: number): TvEpisode {
    return {
      ...episode,
      rating: episode.rating?.average || -1,
      image: episode.image?.medium || TvService.DefaultImage,
      showId: showId,
      watchedDate: undefined,
    } as TvEpisode;
  }

  static async getSeasons(showId: number): Promise<any[]> {
    const data = await fetch(`https://api.tvmaze.com/shows/${showId}/seasons`);
    let results = await data.json();
    results = results.map((season: any) =>
      TvService.toSeasonObject(season, showId)
    );
    return results;
  }

  // eslint-disable-next-line
  private static toSeasonObject(season: any, showId: number): Season {
    return {
      ...season,
      showId: showId,
    } as Season;
  }
}
