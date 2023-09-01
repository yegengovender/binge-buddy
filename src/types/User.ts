import { Show } from "./Show";

export interface User {
  name: string;
  email: string;
  loggedIn: boolean;
  shows: Set<Show>;
  showsProgress: Set<{ show: number; episode: number }>;
}
