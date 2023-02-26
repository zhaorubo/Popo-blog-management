import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// 路由
import Router from '../src/router';

// 状态管理工具
import { createPinia } from 'pinia';

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

createApp(App).use(createPinia()).use(ElementPlus).use(Router).mount('#app');
