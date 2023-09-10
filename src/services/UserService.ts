/* eslint-disable */
import { User } from "@/types/User";

export class UserService {
  static async login(username: string, email: string) {
    const user = new User(username, email);
    user.loggedIn = true;
    console.log("user--->", user);

    const init: RequestInit = {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Accept": "*/*",
        "accept-encoding": "any",
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer my-token',
      },
      body: JSON.stringify({
        username: "johndoe",
        password: "String 1234"
      }),
    };
    const data = (await fetch(`http://localhost:5292/User/login`, init)).body;
    console.log("data--->", data);

    return user;
  }
}
