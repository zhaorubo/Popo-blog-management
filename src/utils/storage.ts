/*
封装storage.ts
*/
interface Stroage {
    namespace: string;
    setItem(key: string, val: any): void;
    getItem(key: string): any;
    removeItem(key: string): void;
    clearAll(): void;
    getStorage(): any;
}
const storage: Stroage = {
    namespace: 'popo',
    setItem(key: string, val: any) {
        let storage = this.getStorage();
        storage[key] = val;
        window.localStorage.setItem(this.namespace, JSON.stringify(storage));
    },
    getItem(key: string) {
        return this.getStorage()[key] || '';
    },
    removeItem(key: string) {
        // 单独的某项删除
        let storage = this.getStorage();
        delete storage[key];
        window.localStorage.setItem(this.namespace, JSON.stringify(storage));
    },
    clearAll() {
        window.localStorage.clear();
    },
    getStorage() {
        return JSON.parse(window.localStorage.getItem(this.namespace) || '{}');
    }
};

export default storage;
