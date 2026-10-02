import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Отключаем sourcemaps в production
    sourcemap: false,

    // Предупреждение, если чанк > 600 КБ
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Функция для разделения чанков (Vite 8 требует функцию)
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/react-router')) {
            return 'router'
          }
          if (id.includes('node_modules/')) {
            return 'vendor'
          }
        },

        // Имена файлов с хэшами
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  server: {
    open: false,
  },
})