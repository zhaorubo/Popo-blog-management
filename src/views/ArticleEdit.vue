<template>
    <div>
        <div class="operation">
            <el-button type="primary" plain @click="clickHandler(EditButton.PREVIEW)">{{ modeText }}</el-button>
            <el-button type="success" v-if="!article" plain @click="clickHandler(EditButton.UPLOAD)">上传</el-button>
            <el-button type="info" v-if="article" plain @click="clickHandler(EditButton.SAVE)">保存</el-button>
        </div>
        <!-- mode="preview" -->
        <v-md-editor v-model="text" :mode="editorMode" height="10rem"></v-md-editor>

        <el-dialog v-model="visible" title="上传设置" width="50%" align-center>
            <el-form label-position="top" :model="form" style="max-width: 460px">
                <el-form-item label="文章封面">
                    <el-upload :auto-upload="false" class="upload" ref="uploadversion" :limit="1" @click="clearFiles" :on-change="filePreviewHandle" :show-file-list="false">
                        <el-image v-if="imageUrl" style="width: 200px; height: 200px" :src="imageUrl" fit="cover" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.title" />
                </el-form-item>
                <el-form-item label="是否可见">
                    <el-switch v-model="form.active" class="ml-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" />
                </el-form-item>
                <el-form-item label="类目">
                    <el-select v-model="form.category" placeholder="请选择类目">
                        <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="visible = false"> 取消 </el-button>
                    <el-button type="primary" @click="dialogHandle(EditButton.UPLOAD)"> 上传 </el-button>
                    <el-button type="primary" @click="dialogHandle(EditButton.SAVE)"> 保存 </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue';
import { createArticle, getCategory, updateArticle } from '../api/api';
import { base64ToBlob } from '../utils/utils';
import storage from '../utils/storage';
import router from '../router';
import { ElMessage, UploadFile } from 'element-plus';
import { nextTick } from 'process';
const visible: Ref<boolean> = ref(false);
const text: Ref<string> = ref(storage.getItem('article').content || '');
const modeText: Ref<string> = ref('预览');
const imageUrl: Ref<string | undefined> = ref('');
const uploadversion: Ref = ref(null);
const article = storage.getItem('article') || '';
const editorMode: Ref<string> = ref('');
let uploadData: any;
let blob: Blob | string = '';
const form: Ref<ArticleForm> = ref({
    title: '',
    category: '',
    article_image: '',
    active: ''
});
const selectOptions: Ref<CategoryData[]> = ref([]);
enum EditButton {
    UPLOAD = 'upload',
    PREVIEW = 'preview',
    SAVE = 'save'
}
enum ButtonText {
    CANCEL = '取消预览',
    PREVIEW = '预览'
}

nextTick(async () => {
    let { result }: Response = await getCategory();
    selectOptions.value = result;
});

const clickHandler = (type: EditButton) => {
    if (type === EditButton.UPLOAD) {
        // 上传
        visible.value = true;
        return;
    }
    if (type === EditButton.PREVIEW) {
        // 预览
        console.log(modeText.value);

        if (ButtonText.CANCEL === modeText.value) {
            editorMode.value = '';
            modeText.value = ButtonText.PREVIEW;
            return;
        }
        editorMode.value = EditButton.PREVIEW;
        modeText.value = ButtonText.CANCEL;
    }
    if (type === EditButton.SAVE) {
        form.value = article;
        imageUrl.value = article.article_image;
        visible.value = true;
    }
};

// 弹窗点击回调
const dialogHandle = async (type: EditButton) => {
    let { user_id, user_name }: User = storage.getItem('user');
    let file = new window.File([blob], 'jpg');
    let upData: any = {
        id: article.id,
        title: form.value.title,
        author_id: user_id,
        author_name: user_name,
        active: form.value.active,
        content: text.value,
        category: form.value.category
    };
    const formData = new FormData();
    formData.append('file', file);
    for (const key in upData) {
        formData.append(key, upData[key]);
    }

    if (type === EditButton.UPLOAD) {
        let res: Response = await createArticle(formData);
        if (res) {
            visible.value = false;
            ElMessage({
                type: 'success',
                message: '上传成功'
            });
            router.push('/article-list');
        } else {
            ElMessage({
                type: 'error',
                message: '出现错误'
            });
        }
    } else {
        let res: Response = await updateArticle(formData);
        if (res) {
            visible.value = false;
            ElMessage({
                type: 'success',
                message: '修改成功'
            });
            router.push('/article-list');
        } else {
            ElMessage({
                type: 'error',
                message: '出现错误'
            });
        }
    }
};

// 清除上传文件
const clearFiles = () => uploadversion.value.clearFiles();

// 获取上传文件并显示图片
const filePreviewHandle = async (uploadFile: UploadFile) => {
    uploadData = uploadFile.raw;
    blob = await base64ToBlob(uploadFile.raw as File);
    imageUrl.value = URL.createObjectURL(blob);
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
.upload {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
}
</style>
