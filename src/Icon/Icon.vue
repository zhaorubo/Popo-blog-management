<template>
    <!--font-icon写法-->
    <i :class="['iconfont', props.icon]" :style="`font-size:${props.size}`" v-if="type === 'font-class'"></i>

    <!--symbol写法-->
    <svg class="icon" aria-hidden="true" v-else>
        <use :xlink:href="`#${props.icon}`"></use>
    </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
    icon: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'font-class'
    },
    size: {
        type: String,
        default: '16px'
    }
});
</script>

<style lang="scss" scoped>
i {
    margin-right: 4px;
    vertical-align: middle;
}

.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
