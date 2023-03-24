import { request } from './index';
interface Login {
    account: string;
    password: string;
}
interface Registered {
    user_name: string;
    account: string;
    password: string;
}
/**
 * 登陆
 * @param data 传递的参数
 * @returns Promise
 */
export const login = (data: Login) => {
    return request({
        url: '/login',
        method: 'POST',
        data
    });
};

/**
 * 注册
 * @param data 传递的参数
 * @returns Promise
 */
export const registered = (data: Registered) => {
    return request({
        url: '/registered',
        method: 'POST',
        data
    });
};
