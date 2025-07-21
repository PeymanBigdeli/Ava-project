import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      "/api": {
        target: "https://harf.roshan-ai.ir",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/ , '/api')
      },
    '/tmpfile': {
      target: 'https://tmpfiles.org',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/tmpfile/, '')
    }
    },
  },
});
