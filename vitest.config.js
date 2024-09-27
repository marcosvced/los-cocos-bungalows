import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,
    css: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias para la carpeta src
      '@test': path.resolve(__dirname, './__test__'), // Alias específico para la carpeta components
    },
  },
})
