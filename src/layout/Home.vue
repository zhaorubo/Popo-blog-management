<template>
    <div id="home">
        <Sidebar id="sidebar"></Sidebar>
        <main id="main">
            <Header id="header"></Header>
            <Content id="content"></Content>
        </main>
    </div>
</template>

<script setup lang="ts">
import Header from './Header.vue';
import Content from './Content.vue';
import Sidebar from './Sidebar.vue';
</script>

<style lang="scss" scoped>
#home {
    font-size: 0.2rem;
    display: flex;
    height: 100vh;
    #sidebar {
        width: 2.5rem;
    }
    #main {
        width: 100%;
        #header {
            height: 0.6rem;
            background-color: #fff;
        }
    }
}
</style>
