<template>
    <div>
        <div class="operation">
            <el-button type="success" plain @click="handleAdd">新增</el-button>
        </div>
        <el-table :data="articleList" stripe size="large" style="width: 100%; height: 10rem">
            <el-table-column label="封面" width="200px">
                <template #default="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.article_image" fit="cover"></el-image>
                </template>
            </el-table-column>
            <el-table-column v-for="table in tableData" :label="table.label" :formatter="table.formatter" :prop="table.prop" :width="table.width"> </el-table-column>

            <el-table-column label="操作设置">
                <template #default="scope">
                    <div style="width: 200px">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { nextTick } from 'process';
import { ref, Ref } from 'vue';
import { getList, deleteArticle } from '../api/api';
import { ElMessage, TableColumnCtx } from 'element-plus';
import router from '../router';
import storage from '../utils/storage';
interface TableData {
    label: string;
    prop: string;
    width: number;
    formatter: Function;
}
const tableData: Ref<TableData[]> = ref([
    {
        label: 'ID',
        prop: 'id',
        width: 180,
        formatter(row: ArticleList, column: TableColumnCtx<ArticleList>) {
            return row.id;
        }
    },
    {
        label: '创建时间',
        prop: 'create_date',
        width: 180,
        formatter(row: ArticleList, column: TableColumnCtx<ArticleList>) {
            return dayjs(row.create_date).format('YYYY-MM-DD');
        }
    },
    {
        label: '更新时间',
        prop: 'update_date',
        width: 180,
        formatter(row: ArticleList, column: TableColumnCtx<ArticleList>) {
            return dayjs(row.update_date).format('YYYY-MM-DD');
        }
    },
    {
        label: '作者',
        prop: 'author_name',
        width: 180,
        formatter(row: ArticleList, column: TableColumnCtx<ArticleList>) {
            return row.author_name;
        }
    },
    {
        label: '标题',
        prop: 'title',
        width: 180,
        formatter(row: ArticleList, column: TableColumnCtx<ArticleList>) {
            return row.title;
        }
    },
    {
        label: '类目',
        prop: 'category',
        width: 180,
        formatter(row: ArticleList, column: TableColumnCtx<ArticleList>) {
            return row.category;
        }
    }
]);
const articleList: Ref<ArticleList[]> = ref([]);

const getListData = async () => {
    let data: Response = await getList();
    articleList.value = data.result;
};

nextTick(async () => {
    getListData();
});
console.log(tableData.value);
// 编辑按钮
const handleEdit = (index: number, row: ArticleList) => {
    storage.setItem('article', row);
    router.push('article-edit');
};

// 新增
const handleAdd = () => {
    storage.removeItem('article');
    router.push('/article-edit');
};

// 删除按钮
const handleDelete = async (index: number, row: ArticleList) => {
    let { code }: Response = await deleteArticle({ id: row.id });
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
        getListData();
    }
};
</script>

<style lang="scss" scoped>
.operation {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    margin-bottom: 0.2rem;
    .el-button:last-child {
        margin-right: 100px;
    }
}
</style>
