import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 🔥 Ajoute ceci pour éviter les erreurs de chargement des fichiers après déploiement
  plugins: [react()],
})