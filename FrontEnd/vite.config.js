import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://mini-crm-6gp2.onrender.com',
        secure: true,
      },
    },
  },
  plugins: [react()],
})
