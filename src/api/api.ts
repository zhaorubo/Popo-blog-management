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

/**
 * 获取文章
 * @returns Promise
 */
export const getList = (): Promise<Response> => {
    return request({
        url: '/get_article',
        method: 'GET'
    });
};

/**
 *
 * 创建文章
 * @returns
 */
export const createArticle = (data: any): Response => {
    return request({
        url: '/create_article',
        method: 'POST',
        data
    });
};

/**
 * 获取类目
 * @returns
 */
export const getCategory = (): Response => {
    return request({
        url: '/get_category',
        method: 'GET'
    });
};

/**
 * 更新文章
 * @returns
 */
export const updateArticle = (data: any): Response => {
    return request({
        url: '/change_article',
        method: 'PUT',
        data
    });
};

/**
 * 删除文章
 * @returns
 */
export const deleteArticle = (data: { id: number }): Response => {
    return request({
        url: '/delete_article',
        method: 'DELETE',
        data
    });
};

/**
 * 创建类目
 * @returns
 */
export const createCategory = (data: { label: string }): Response => {
    return request({
        url: '/create_category',
        method: 'POST',
        data
    });
};

/**
 * 删除类目
 * @returns
 */
export const deleteCategory = (data: { id: number }): Response => {
    return request({
        url: '/delete_category',
        method: 'DELETE',
        data
    });
};

/**
 * 更新类目
 * @returns
 */
export const updateCategory = (data: { label: string }): Response => {
    return request({
        url: '/change_category',
        method: 'PUT',
        data
    });
};
