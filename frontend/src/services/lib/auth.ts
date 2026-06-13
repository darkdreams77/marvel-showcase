import { apiPostAuth } from "./axios";

interface LoginBody {
  email: string;
  password: string;
}

interface LoginData {
  email: string;
}

interface SignupBody {
  username: string;
  email: string;
  password: string;
}

export async function login(body: LoginBody) {
  return apiPostAuth<LoginBody, LoginData>("/user/login", body);
}

export async function logout() {
  await apiPostAuth("/user/logout", {}); // ← withCredentials: true
  window.location.href = "/";
}

export async function signup(body: SignupBody) {
  return apiPostAuth<SignupBody, { username: string; email: string }>(
    "/user/signup",
    body,
  );
}
