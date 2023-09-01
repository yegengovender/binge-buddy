import { Show } from "@/types/Show";
import { TvEpisode } from "@/types/TvEpisode";

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
      //   episodes: await TvService.getEpisodes(show.id),
    } as Show;
  }

  static async getEpisodes(showId: number): Promise<TvEpisode[]> {
    const data = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
    let results = await data.json();
    results = results.map((episode: any) => TvService.toEpisodeObject(episode));
    return results;
  }

  private static toEpisodeObject(episode: any): TvEpisode {
    return {
      ...episode,
      rating: episode.rating?.average || -1,
      image: episode.image?.medium || TvService.DefaultImage,
    } as TvEpisode;
  }
}
