import * as VueRouter from 'vue-router';
import Home from '../components/Home.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

export default router;
