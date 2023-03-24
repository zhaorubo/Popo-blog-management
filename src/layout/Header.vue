<template>
    <header>
        <div class="menu-icon">
            <Icon icon="icon-caidan" size="0.4rem"></Icon>
        </div>
        <div class="search">
            <Icon icon="icon-sousuo" size="0.3rem"></Icon>
            <input id="search" type="text" placeholder="Search something..." />
        </div>
        <div class="user-container">
            <div class="inform">
                <Icon icon="icon-wenzhanghuoke-" size="0.4rem"></Icon>
            </div>
            <div class="user-message">
                <div class="user-hand">
                    <img src="" alt="" />
                </div>
                <div class="user-name">
                    <p>Popo</p>
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import Icon from '../Icon/Icon.vue';
</script>

<style lang="scss" scoped>
header {
    border-bottom: 0.01rem solid rgba(41, 41, 41, 0.11);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .menu-icon {
        cursor: pointer;
    }
    .search {
        text-align: center;
        margin-left: -1rem;
        flex-grow: 0.6;

        #search {
            background: rgba(244, 246, 251, 1);
            margin-left: 0.1rem;
        }
    }
    .user-container {
        width: 3.32rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .user-message {
            display: flex;
            width: 1.86rem;
            align-items: center;
            .user-hand {
                width: 0.4rem;
                height: 0.4rem;
                margin-right: 0.25rem;
                border-radius: 0.1rem;
                background-color: #fff;
            }
            .user-name {
                color: rgba(14, 14, 25, 1);
                width: 0.13rem;
            }
        }
    }
}
</style>
