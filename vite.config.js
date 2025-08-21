// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // or other framework plugin

export default defineConfig({
  plugins: [react()],
  base: "/Book_library"
});
