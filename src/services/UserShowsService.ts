import { Show } from "@/types/Show";
import { User } from "@/types/User";

export class UserShowsService {
  static getUserShow(user: User, showId: number): Show | undefined {
    return user.shows.find((s) => s.id === showId);
  }
}
