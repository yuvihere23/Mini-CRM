import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://mini-crm-6gp2.onrender.com', // Update this to your Render backend URL
        secure: true,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
