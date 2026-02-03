import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Increase chunk size warning limit to 1000KB
    chunkSizeWarningLimit: 1000,

    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - separate large libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material'],
          'lucide-vendor': ['lucide-react'],

          // Feature-based chunks
          'cart-wishlist': [
            './src/context/CartContext/CartContext.jsx',
            './src/context/WishListContext/WishListContext.jsx'
          ],
        }
      }
    },

    // Minification and optimization
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
      }
    }
  },

  // Server configuration
  server: {
    port: 3000,
    open: true
  }
})