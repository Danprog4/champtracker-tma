import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";
import Unfonts from "unplugin-fonts/vite";

export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    Unfonts({
      custom: {
        families: [
          {
            name: "Druk",
            local: "Druk",
            src: "./src/assets/fonts/Druk/*.ttf",
          },
        ],
        preload: true,
      },
    }),
  ],

  server: {
    allowedHosts: ["localhost", "127.0.0.1", "ivan-front.router9.xyz"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
