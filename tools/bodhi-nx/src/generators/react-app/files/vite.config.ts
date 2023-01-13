import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sassDts from "vite-plugin-sass-dts";

export default defineConfig({
  server: {
    port: 3000,
    host: "localhost",
  },
  plugins: [react(), sassDts()],
});
