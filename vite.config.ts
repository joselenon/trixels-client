import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Defina a porta desejada aqui
    host: '0.0.0.0', // Para acessar o app de outros dispositivos na mesma rede
  },
});
