/* eslint-disable */
import { User } from "@/types/User";

const apiEndpoint = "http://localhost:5292";

export class UserService {
  static async login(username: string, password: string) {
    const loginRequest = {
      username: username,
      password: password,
    };
    const data = await UserService.apiLogin(loginRequest);
    console.log("data--->", data);

    const userAny: any = await UserService.apiGetUser(username);
    const user = new User(userAny.name, userAny.email);
    user.loggedIn = true;
    console.log("user--->", user);

    return user;
  }

  static async register(username: string, email:string, password: string) {
    const data = await UserService.apiRegister(username, email, password);
    console.log("data--->", data);

    const userAny: any = await UserService.apiGetUser(username);
    const user = new User(userAny.name, userAny.email);
    user.loggedIn = true;
    console.log("user--->", user);

    return user;
  }

  private static async apiLogin(loginRequest: {
    username: string;
    password: string;
  }) {
    const init: RequestInit = UserService.makeInit(loginRequest);

    const data = (await fetch(`${apiEndpoint}/User/login`, init)).body;
    return data;
  }

  private static makeInit(
    payload: object,
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
      body: JSON.stringify(payload),
    };
  }

  static async apiGetUser(username: string) {
    const data = (await fetch(`${apiEndpoint}/api/Users/${username}`)).json();
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
}
