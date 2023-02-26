/// <reference types="vite/client" />
declare module '*.vue' {
    import { defineComponent } from 'vue';
    const Component: ReturnType<typeof defineComponent>;
    export default Component;
}

declare module Popo {
    export const test: string = '这里可以声明全局的方法或者属性： 使用export导出即可随地访问';
}
