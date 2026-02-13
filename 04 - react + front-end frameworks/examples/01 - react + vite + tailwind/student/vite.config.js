import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// TODO: import tailwindcss
import tailwindcss from '@tailwindcss/vite'; 

export default defineConfig({
  plugins: [
    react(),
    // TODO: add the tailwindcss plugin
    tailwindcss(),
    ],
});