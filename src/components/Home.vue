<template>
    <div>
        Home
        <el-button @click="clickHandler"> 点击+1</el-button>
        {{ store.count }}
    </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '../store';
const store = useCounterStore();
const clickHandler: Function = () => {
    store.count += 1;
};
</script>

<style lang="scss" scoped></style>
