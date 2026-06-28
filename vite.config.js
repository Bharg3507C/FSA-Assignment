import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['fsa-assignment-zlk5.onrender.com']
  },
  preview: {
    allowedHosts: ['fsa-assignment-zlk5.onrender.com']
  }
})