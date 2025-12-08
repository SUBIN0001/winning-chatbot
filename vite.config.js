import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "./",    // VERY IMPORTANT for embedding chatbot inside another website

  plugins: [
    react(),
    tailwindcss(),
  ],

  // Development server config
  server: {
    proxy: {
      '/api/n8n': {
        target: 'https://solutionseekers.app.n8n.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/n8n/, ''),
        secure: false,
      }
    }
  },

  // Production build settings
  build: {
    outDir: 'dist',       // folder where build will be created
    emptyOutDir: true,    // cleans dist folder before building
  }
})
