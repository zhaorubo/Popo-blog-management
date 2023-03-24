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
    display: flex;
    background-color: #ffffff;
    min-height: 100vh;
}

#sidebar {
    background: rgba(244, 246, 251, 1);
    width: 2.8rem;
}
#main {
    width: 100%;
    #header {
        background: rgba(244, 246, 251, 1);
        height: 0.96rem;
    }
    // #content {
    //     // background-color: pink;
    // }
}
</style>
