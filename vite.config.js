import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Repo name — the app is served from https://priyakumari77.github.io/flipkart-clone/
  base: '/flipkart-clone/',
  plugins: [react()],
})
