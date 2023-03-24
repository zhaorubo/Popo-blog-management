import * as VueRouter from 'vue-router';
import Home from '../layout/Home.vue';
import storage from '../utils/storage';
type To = VueRouter.RouteLocationNormalized;
type From = VueRouter.RouteLocationNormalized;
type Next = VueRouter.NavigationGuardNext;
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        redirect: 'first',
        children: [
            {
                path: 'first',
                name: 'First',
                component: () => import('../views/First.vue')
            },
            {
                path: 'article-list',
                name: 'ArticleList',
                component: () => import('../views/ArticleList.vue')
            },
            {
                path: 'article-edit',
                name: 'ArticleEdit',
                component: () => import('../views/ArticleEdit.vue')
            },
            {
                path: 'article-category',
                name: 'ArticleCategory',
                component: () => import('../views/ArticleCategory.vue')
            },
            {
                path: 'my',
                name: 'My',
                component: () => import('../views/My.vue')
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    }
];

const router: VueRouter.Router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

router.beforeEach((to: To, from: From, next: Next) => {
    // token
    const token: string = storage.getItem('token');
    if (!token && to.fullPath != '/login') {
        router.push('/login');
        return;
    }
    next();
});

export default router;
