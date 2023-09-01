import { TvEpisode } from "./TvEpisode";

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
}
