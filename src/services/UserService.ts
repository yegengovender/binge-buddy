/* eslint-disable */
import { Show } from "@/types/Show";
import { User } from "@/types/User";
import { UserShowService } from "./UserShowService";

const apiEndpoint = "http://localhost:5292";

export class UserService {
  static async login(username: string, password: string) {
    const data = await UserService.apiLogin(username, password);

    const userObj: any = await await UserService.apiGetUser(username);
    const user = new User(userObj.id, userObj.name, userObj.email);

    UserShowService.setUserShows(user, userObj);

    user.loggedIn = true;
    return user;
  }

  static async register(username: string, email: string, password: string) {
    const data = await UserService.apiRegister(username, email, password);

    const userAny: any = await UserService.apiGetUser(username);
    const user = new User(userAny.id, userAny.name, userAny.email);
    user.loggedIn = true;

    return user;
  }

  static async apiGetUser(username: string) {
    const data = (await fetch(`${apiEndpoint}/api/Users/${username}`)).json();
    return data;
  }

  private static async apiLogin(username: string, password: string) {
    const loginRequest = {
      username: username,
      password: password,
    };

    const init: RequestInit = UserService.makeInit(loginRequest);

    const data = (await fetch(`${apiEndpoint}/User/login`, init)).body;
    return data;
  }

  static async apiRegister(username: string, email: string, password: string) {
    const init: RequestInit = UserService.makeInit({
      username,
      email,
      password,
    });

    const data = (await fetch(`${apiEndpoint}/User/register`, init)).body;
    return data;
  }

  static makeInit(
    payload: object | null,
    method: string = "POST"
  ): RequestInit {
    return {
      method: method,
      // mode: "no-cors",
      headers: {
        Accept: "*/*",
        "accept-encoding": "any",
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer my-token',
      },
      body: payload && JSON.stringify(payload),
    };
  }
}
