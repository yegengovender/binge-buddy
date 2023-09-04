import { Show } from "./Show";
import { UserShow } from "./UserShow";


export interface IUser {
  name: string;
  email: string;
  loggedIn: boolean;
  shows: Show[];
  userShows: UserShow[];
}
