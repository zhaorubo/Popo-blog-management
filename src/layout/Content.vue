<template>
    <article>
        <el-tabs v-model="mainStore.editableTabsValue" type="card" @tab-click="handleTabsClick" @tab-remove="handleTabsEditRemove">
            <el-tab-pane v-for="item in mainStore.tabsList" :closable="item.name !== '/first'" :name="item.name" :label="item.title"></el-tab-pane>
        </el-tabs>

        <router-view v-slot="{ Component }">
            <keep-alive :include="['ArticleList']">
                <component :is="Component" :key="$route.fullPath" />
            </keep-alive>
        </router-view>
    </article>
</template>

<script lang="ts" setup>
import type { TabPaneName, TabsPaneContext } from 'element-plus';
import { useMainStore } from '../store';
import { useRouter } from 'vue-router';
import storage from '../utils/storage';
const router = useRouter();
const mainStore = useMainStore();
const handleTabsEditRemove = (targetName: TabPaneName | undefined) => {
    const index = mainStore.tabsList.findIndex(tab => tab.name === targetName);
    const lock = mainStore.tabsList.length > 0;
    // 是当前激活页签，并且不是最后一个可删除页签
    if (mainStore.tabsList[index].name === mainStore.editableTabsValue && index !== mainStore.tabsList.length - 1) {
        console.log('come');
        lock && (mainStore.editableTabsValue = mainStore.tabsList[index + 1].name);
        lock && router.push(mainStore.tabsList[index + 1].name);
        // 是当前激活页签并且此可删除页签不在第一个
    } else if (mainStore.tabsList[index].name === mainStore.editableTabsValue && index >= 1) {
        lock && (mainStore.editableTabsValue = mainStore.tabsList[index - 1].name);
        lock && router.push(mainStore.tabsList[index - 1].name);
    }
    mainStore.tabsList.splice(index, 1);
    storage.setItem('tabList', mainStore.tabsList);
};
const handleTabsClick = (pane: TabsPaneContext) => {
    let paneName: string = pane.paneName as string;
    router.push(paneName);
};
</script>

<style lang="scss" scoped>
.view {
    padding: 0.2rem;
    padding-top: 0;
}
</style>
