import { createApp } from 'vue';
// 全局样式重置 reset.css
import './assets/styles/reset.css';
// 移动端1像素边框问题样式 border.css
import './assets/styles/border.css';
// 校准rem
import './utils/rem';
import App from './App.vue';
import './assets/styles/global.css';
// icon
import './Icon/font/iconfont.css';
import './Icon/font/iconfont.js';

// 路由
import Router from '../src/router';

// 状态管理工具
import { createPinia } from 'pinia';

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
const app = createApp(App);
app.use(createPinia()).use(ElementPlus).use(Router).mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
