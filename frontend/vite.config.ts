import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd());

  const API_URL = `${env.VITE_BFF_URL ?? "http://localhost:3000"}`;

  return defineConfig({
    plugins: [react(), tailwindcss()],

    server: {
      proxy: {
        "/api": API_URL,
      },
    },
  });
};
