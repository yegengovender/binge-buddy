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
}
