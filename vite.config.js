import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 用 import.meta.env.MODE 判斷
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/C02_QT/' : '/',
  plugins: [react()],
}));
