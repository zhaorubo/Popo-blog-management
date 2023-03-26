<template>
    <header>
        <el-icon :size="20" style="margin-left: 20px" class="hidden-sm-and-down" @click="clickHandler"><Menu /></el-icon>
        <div class="search">
            <el-icon :size="20"><Search /></el-icon>
            <input type="text" placeholder="search something..." />
        </div>
        <div class="user hidden-sm-and-down">
            <div class="user-message">
                <div class="user-name">
                    <strong>{{ user.user_name }}</strong>
                </div>
                <div class="user-head-img">
                    <el-avatar :icon="UserFilled" :src="user.user_head" />
                </div>
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue';
import { useMainStore } from '../store/index';
import storage from '../utils/storage';
const user: User = storage.getItem('user');
const mainStore = useMainStore();
const clickHandler = () => {
    mainStore.isShow = !mainStore.isShow;
    console.log(mainStore.isShow);
};
</script>

<style lang="scss" scoped>
header {
    display: flex;
    align-items: center;
    .search {
        width: 3rem;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.2rem;
        .el-icon {
            margin-right: 0.1rem;
        }
        input {
            width: 5rem;
            height: 0.4rem;
            background-color: transparent;
            border: 0.01rem solid #fff;
            color: #5f5959;
            border-radius: 0.3rem;
            padding: 0 0.2rem;
        }
    }
    .user {
        display: flex;
        align-items: center;
        margin-right: 1rem;
        .user-message {
            width: 3rem;
            display: flex;
            justify-content: space-around;
            .user-name {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.2rem;
            }
            .user-head-img {
                width: 0.5rem;
                height: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>
