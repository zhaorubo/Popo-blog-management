<template>
    <div>
        <div class="operation">
            <el-button type="success" plain @click="visible = true">新增</el-button>
        </div>
        <el-table :data="categoryData" stripe size="large" style="width: 100%; height: 10rem">
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
        <el-dialog v-model="visible" title="上传设置" width="50%" align-center>
            <el-form label-position="top" :model="form" style="max-width: 460px">
                <el-form-item label="标题">
                    <el-input v-model="form.label" />
                </el-form-item>
                <el-form-item label="是否可见">
                    <el-switch v-model="form.active" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visible = false"> 取消 </el-button>
                    <el-button type="primary" @click="dialogHandle"> 保存 </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import dayjs from 'dayjs';
import { ElMessage, TableColumnCtx } from 'element-plus';
import { getCategory, createCategory, deleteCategory, updateCategory } from '../api/api';
import { nextTick } from 'process';
interface TableData {
    label: string;
    prop: string;
    width: number;
    formatter: Function;
}
const type: Ref<string> = ref('');
const tableData: Ref<TableData[]> = ref([
    {
        label: 'ID',
        prop: 'id',
        width: 180,
        formatter(row: Category, column: TableColumnCtx<Category>) {
            return row.id;
        }
    },
    {
        label: '创建时间',
        prop: 'create_date',
        width: 180,
        formatter(row: Category, column: TableColumnCtx<Category>) {
            return dayjs(row.create_date).format('YYYY-MM-DD');
        }
    },
    {
        label: '类目',
        prop: 'label',
        width: 180,
        formatter(row: Category, column: TableColumnCtx<Category>) {
            return row.label;
        }
    },
    {
        label: '状态(隐藏|可见)',
        prop: 'active',
        width: 180,
        formatter(row: Category, column: TableColumnCtx<Category>) {
            return row.active === '1' ? '可见' : '隐藏';
        }
    }
]);
const categoryData: Ref<Category[]> = ref([]);
const visible: Ref<boolean> = ref(false);
const form = ref({ label: '', active: true });
const getCategoryData = async () => {
    let { result }: Response = await getCategory();
    categoryData.value = result;
};
nextTick(async () => {
    getCategoryData();
});
const handleEdit = (index: number, row: any) => {
    type.value = 'edit';
};
const handleDelete = async (index: number, row: Category) => {
    let { code }: Response = await deleteCategory({ id: row.id });
    if (code === 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
    }
    getCategoryData();
};
const dialogHandle = async () => {
    let result: Response;
    if (type.value === 'edit') {
        result = await updateCategory(form.value);
        if (result.code === 200) {
            ElMessage({
                type: 'success',
                message: '修改成功'
            });
            visible.value = false;
        }
        return;
    }
    result = await createCategory(form.value);
    if (result.code === 200) {
        ElMessage({
            type: 'success',
            message: '创建成功'
        });
        visible.value = false;
    }
    getCategoryData();
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
