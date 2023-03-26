import { createApp } from 'vue';
// 全局样式重置 reset.css
import './assets/styles/reset.css';
// 移动端1像素边框问题样式 border.css
import './assets/styles/border.css';
// 校准rem
import App from './App.vue';
// import './assets/styles/global.css';
import './assets/styles/menuStyle.css';

// 路由
import Router from '../src/router';

// 状态管理工具
import { createPinia } from 'pinia';

// v-md-editor
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
VMdEditor.use(githubTheme);

// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/theme-chalk/display.css';
const app = createApp(App);
app.use(createPinia()).use(ElementPlus).use(Router).use(VMdEditor).mount('#app');
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
