<template>
    <div id="login">
        <div class="img">
            <img src="../assets/images/login/Image BG.png" alt="Popo" />
        </div>
        <div class="user">
            <div class="title">Welcome Back!</div>
            <div class="form">
                <div class="form-item" v-for="item in form" :style="{ display: item.label == '用户名' && formType != 'registered' ? 'none' : '' }">
                    <label for="name">{{ item.label }}</label>
                    <input name="name" v-model="item.value" type="text" :placeholder="item.placeholder" />
                </div>
                <el-button type="info" size="large" @click="loginHandler">登陆</el-button>
                <el-button type="info" size="large" style="margin: 0.2rem 0 0 0" @click="registeredHandler">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { login, registered } from '../api/api';
import { useUserStore } from '../store/index';
import storage from '../utils/storage';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { Router } from 'vue-router';
import type { Ref } from 'vue';
interface LoginResult {
    code: number;
    tips: string;
    result: [any];
    token: string;
}
interface RegisteredResult {
    code: number;
    tips: string;
    create_date: number;
    user_head: string;
    author_id: number;
    account_state: number;
    account: string;
    password: string;
    user_name: string;
}
const router: Router = useRouter();
const userStore = useUserStore();
const formType: Ref<string> = ref('login');
const form: Ref<{ label: string; placeholder: string; value: string }[]> = ref([
    {
        label: '用户名',
        placeholder: '请输入用户名',
        value: ''
    },
    {
        label: '账号',
        placeholder: '请输入账号',
        value: ''
    },
    {
        label: '密码',
        placeholder: '请输入密码',
        value: ''
    }
]);

const loginHandler = async () => {
    if ((!form.value[1].value || !form.value[2].value) && formType.value === 'login') {
        ElMessage({
            type: 'warning',
            message: '还有没有填哦'
        });
        return;
    }
    if (formType.value === 'registered') {
        formType.value = 'login';
        return;
    }
    let result: LoginResult = (await login({
        account: form.value[1].value,
        password: form.value[2].value
    })) as LoginResult;
    console.log(result, form);

    if (result.code === 200) {
        storage.setItem('token', result.token);
        router.push('/');
        userStore.info = result.result[0];
    }
};

const registeredHandler = async () => {
    if ((!form.value[1].value || !form.value[2].value || !form.value[0].value) && formType.value === 'registered') {
        ElMessage({
            type: 'warning',
            message: '还有没有填哦'
        });
        return;
    }
    if (formType.value === 'login') {
        formType.value = 'registered';
        return;
    }
    let result: RegisteredResult = (await registered({
        user_name: form.value[0].value,
        account: form.value[1].value,
        password: form.value[2].value
    })) as RegisteredResult;
    if (result.code === 200) {
        formType.value = 'login';
        return;
    }
};
</script>

<style lang="scss" scoped>
.img {
    width: 60%;
    height: 100vh;
    background: rgba(244, 246, 251, 1);
    img {
        width: 100%;
        height: 100%;
    }
}
input {
    border: 1px solid #ccc;
    border-radius: 0.1rem;
    padding: 0.2rem;
    box-sizing: border-box;
    width: 6rem;
    height: 0.7rem;
    background: rgba(250, 252, 254, 1);
    color: rgba(14, 14, 25, 1);
    font-size: 0.2rem;
    &:focus {
        border-color: #909399;
    }
}
label {
    color: #7d7a7a;
    margin-bottom: 0.2rem;
}
#login {
    display: flex;
    height: 100%;
    .user {
        flex: 1;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        .title {
            color: rgba(14, 14, 25, 1);
            font-size: 0.4rem;
            text-align: left;
            width: 6rem;
            margin-bottom: 1rem;
        }
        .form {
            display: flex;
            flex-direction: column;
            .form-item {
                display: flex;
                flex-direction: column;
                margin-bottom: 0.4rem;
            }
        }
    }
}
</style>
