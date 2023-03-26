<template>
    <aside class="hidden-sm-and-down" :style="{ width: mainStore.isShow ? '63px' : '2.5rem' }">
        <el-menu :default-active="mainStore.editableTabsValue" :collapse="mainStore.isShow" router @select="handleSelect">
            <div class="title" v-show="!mainStore.isShow">Client</div>
            <el-menu-item :index="item.route" v-for="item in sidebarArr">
                <el-icon>
                    <component :is="item.icon"></component>
                </el-icon>
                <template #title>{{ item.label }}</template>
            </el-menu-item>
        </el-menu>
    </aside>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMainStore } from '../store';
import storage from '../utils/storage';
const mainStore = useMainStore();
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

const handleSelect = (index: string) => {
    let menu = sidebarArr.value.find(menu => menu.route === index);
    let tabIndex = mainStore.tabsList.findIndex(tab => tab.name === index);
    if (tabIndex != -1) return (mainStore.editableTabsValue = index);
    if (menu) {
        mainStore.tabsList.push({
            title: menu.label,
            name: menu.route
        });
        storage.setItem('tabList', mainStore.tabsList);
        mainStore.editableTabsValue = menu.route;
        return;
    }
};
</script>

<style lang="scss" scoped>
.title {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    height: 60px;
}
</style>
