// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    // Removed base: '/reasonly/' for Vercel deployment
    server: {
      port: 3000,
      open: true
    },
    define: {
      'process.env': {}
    }
  }
})
