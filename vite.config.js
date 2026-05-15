// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // or other framework plugin

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/Book_library/" : "/",
}));
