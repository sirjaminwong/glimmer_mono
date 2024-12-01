import { http } from "../../utils/http";
import { User } from "./model";

export async function login(account: string, password: string) {
  return await http.request<{
    access_token: string;
    user: User;
  }>({
    method: "post",
    url: "auth/login",
    data: {
      screenName: account,
      password,
    },
  });
}

export function getProfile() {
  return http.request<User>({
    method: "get",
    url: "auth/profile",
  });
}

export async function register(name: string, password: string) {
  return await http.request<{
    access_token: string;
    user: User;
  }>({
    method: "post",
    url: "auth/register",
    data: {
      username: name,
      password: password,
    },
  });
}
