import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr"; // plugin que transforma arquivos svg em componentes react

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: { host: true },
});
