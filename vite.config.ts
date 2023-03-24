import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': path.relative(__dirname, './src')
        }
    },
    server: {
        https: false,
        proxy: {
            '/api': {
                // 配置需要代理的路径 --> 这里的意思是代理http://localhost:80/api/后的所有路由
                target: 'http://43.143.40.210:8080/popo', // 目标地址 --> 服务器地址
                changeOrigin: true, // 允许跨域
                ws: false, // 允许websocket代理
                // 重写路径 --> 作用与vue配置pathRewrite作用相同
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/style.scss";'
            }
        }
    }
});
