<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="author_name" label="作者" />
        <el-table-column prop="update_date" label="文章类目" />
        <el-table-column prop="create_date" label="创建时间" />
        <el-table-column prop="update_date" label="更新时间">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
interface tableData {
    date: string;
    name: string;
    address: string;
}
const tableData: Ref<tableData[]> = ref([
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
    }
]);

// 编辑按钮
const handleEdit = (index: number, row: any) => {
    console.log(index, row);
};

// 删除按钮
const handleDelete = (index: number, row: any) => {
    console.log(index, row);
};
</script>

<style lang="scss" scoped></style>
