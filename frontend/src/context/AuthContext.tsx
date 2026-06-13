import { createContext, useContext, useEffect, useState } from "react";

import { apiGetAuth } from "../services/lib/axios";
import { login, logout, signup } from "../services/lib/auth";

interface User {
  email: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignup: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  handleLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiGetAuth<User>("/user/me")
      .then((res) => {
        if (res.success && res.data) setUser(res.data);
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  async function handleLogin(email: string, password: string) {
    const res = await login({ email, password });
    if (res.success && res.data) setUser(res.data);
  }

  async function handleSignup(
    username: string,
    email: string,
    password: string,
  ) {
    const res = await signup({ username, email, password });
    if (res.success && res.data) setUser(res.data);
  }

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, handleLogin, handleSignup, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return ctx;
}
