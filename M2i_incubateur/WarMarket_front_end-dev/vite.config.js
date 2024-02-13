import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [ reactRefresh()],  
    define: {
        
      },
      
      devServer: {
        proxy: {
          '^/': {
            target: 'http://localhost:8080/ws',
            ws: true,
            changeOrigin: true
          }
        }
      }
});
