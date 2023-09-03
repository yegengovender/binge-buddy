import { Show } from "./Show";
import { ShowsProgress } from "./ShowsProgress";

export interface User {
  name: string;
  email: string;
  loggedIn: boolean;
  shows: Set<Show>;
  showsProgress: Set<ShowsProgress>;
}
