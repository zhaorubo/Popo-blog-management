<template>
    <aside>
        <div class="title">
            <div class="icon">
                <img src="../assets/images/sidebar/Group 1527.png" alt="Popo_image" />
            </div>
            <span class="text">CLINENT</span>
        </div>
        <div class="body">
            <div class="list">
                <div class="list-item" @click="toPage(item.route)" v-for="item in sidebarArr">
                    <!-- <Icon :icon="item.icon" :class="[item.route == $route.path ? 'active-color' : '']" size="0.4rem"></Icon> -->
                    <el-icon size="0.3rem" :color="item.route == $route.path ? 'skyblue' : ''">
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span :class="[item.route == $route.path ? 'active-color' : '']">{{ item.label }}</span>
                </div>
            </div>
        </div>
    </aside>
</template>

<script lang="ts" setup>
import Icon from '../Icon/Icon.vue';
import { ref } from 'vue';
import router from '../router';
const sidebarArr = ref([
    {
        icon: 'House',
        label: '首页',
        route: '/first'
    },
    {
        icon: 'Memo',
        label: '文章列表',
        route: '/article-list'
    },
    {
        icon: 'DocumentAdd',
        label: '编辑文章',
        route: '/article-edit'
    },
    {
        icon: 'Guide',
        label: '文章分类',
        route: '/article-category'
    },
    {
        icon: 'User',
        label: '我的',
        route: '/my'
    }
]);

const toPage = (path: string) => {
    router.push(path);
};
</script>

<style lang="scss" scoped>
.active-color {
    color: skyblue !important;
}
.title {
    height: 0.96rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 0.01rem solid rgba(14, 14, 25, 0.3);
    .text {
        margin-left: 0.16rem;
    }
}
.list {
    margin-top: 0.1rem;
    .list-item {
        position: relative;
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-sizing: border-box;
        span {
            font-size: 0.2rem;
            color: rgba(14, 14, 25, 1);
            margin-left: 0.1rem;
        }
        &:hover {
            // animation: hover 1s infinite;
            background: rgba(228, 233, 244, 0.5);
            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 0.02rem;
                bottom: -0.01rem;
                background-color: #ccc;
                animation: rotates 2s infinite;
            }
        }
    }
}
@keyframes rotates {
    0% {
        transform: rotateY(0deg);
    }
    50% {
        transform: rotateY(180deg);
    }
    // 75% {
    //     transform: rotate(180deg);
    // }
    100% {
        transform: rotateY(0deg);
    }
}
</style>
