import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ВАЖНО для GitHub Pages:
// Если репозиторий называется, например, "gumball-machine" и деплоится
// на https://<username>.github.io/gumball-machine/ — base ДОЛЖЕН совпадать
// с именем репозитория.
// Если это репозиторий вида <username>.github.io (user/organization page) —
// base должен быть '/' (корень).
export default defineConfig({
  plugins: [react()],
  base: '/lucky/', // <-- поменяй на имя своего репозитория
  build: {
    outDir: 'dist',
  },
  server: {
    middlewareMode: false,
  },
  // Конфигурируем статические папки для dev и build
  publicDir: 'refs',
})
