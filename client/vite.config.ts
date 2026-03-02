import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            '/hub': 
            {
                target: 'http://localhost:5090',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
            '/api':
            {
                target: 'http://localhost:5090',
                changeOrigin: true,
                secure: false,
            },
        },
    },
})
