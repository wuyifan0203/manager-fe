import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    host:'localhost',
    port:8080,
    proxy:{
      '/api':{
        target:"http://localhost:3000"
      }
    }
  },
  resolve:{
    alias:[
      {
        find:'@',
        // eslint-disable-next-line no-undef
        replacement:resolve(__dirname,'src')
      }
    ]
  }
});
