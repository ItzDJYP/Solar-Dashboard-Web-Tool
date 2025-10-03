import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Solar-Dashboard-Web-Tool/', // 👈 MUST match your repo name exactly
})
