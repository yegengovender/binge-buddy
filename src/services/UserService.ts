import { User } from "@/types/User";

export class UserService {
  static login(username: string, email: string) {
    const user = new User(username, email);
    user.loggedIn = true;
    return user;
  }
}
