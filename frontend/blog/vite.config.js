import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows external access
    strictPort: true, // Ensures Vite doesn't change ports
    allowedHosts: ['.ngrok-free.app'], // Allows ngrok URLs
    port: 5173, // Make sure it matches your frontend port
  }
})
