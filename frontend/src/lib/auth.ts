import { apiPost, apiPostAuth } from "./axios";

interface LoginBody {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  email: string;
}

interface SignupBody {
  username: string;
  email: string;
  password: string;
}

export async function login(body: LoginBody) {
  return apiPost<LoginBody, LoginData>("/user/login", body);
}

export async function logout() {
  await apiPost("/user/logout", {});
  window.location.href = "/login";
}

export async function signup(body: SignupBody) {
  return apiPostAuth<SignupBody, { username: string; email: string }>(
    "/user/signup",
    body,
  );
}
