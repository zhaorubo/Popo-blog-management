import { defineStore } from 'pinia';
import storage from '../utils/storage';
interface TabItem {
    title: string;
    name: string;
}
export const useMainStore = defineStore('user', {
    state: () => {
        return {
            isShow: false,
            tabsList: (storage.getItem('tabList') as TabItem[]) || ([{ title: '首页', name: '/first' }] as TabItem[]),
            editableTabsValue: '/first'
        };
    }
});

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            info: Object
        };
    }
});
