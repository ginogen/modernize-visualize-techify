import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    'import.meta.env.VITE_GOOGLE_CLIENT_EMAIL': JSON.stringify(process.env.GOOGLE_CLIENT_EMAIL),
    'import.meta.env.VITE_GOOGLE_PRIVATE_KEY': JSON.stringify(process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')),
  }
}));
