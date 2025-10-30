import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // <-- PASTIKAN BARIS INI ADA

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // <-- PASTIKAN BARIS INI BENAR
    },
  },
})