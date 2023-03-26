<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useMainStore } from './store/index';
const router = useRouter();
const mainStore = useMainStore();
router.beforeEach((to, from, next) => {
    let path: string = to.fullPath.split('?')[0];
    mainStore.editableTabsValue = path;
    next();
});
</script>

<style scoped lang="sass"></style>
