import { User } from "@/types/User";

export class UserService {
  static addShow(user: User, show: any) {
    user.shows.add(show);
  }
  static removeShow(user: User, show: any) {
    user.shows.delete(show);
  }
}
