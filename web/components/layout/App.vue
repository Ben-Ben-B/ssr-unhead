<template>
  <router-view :asyncData="asyncData" />
</template>

<script lang="ts" setup>
// Register global plugins/components here
// Read document get more details http://doc.ssr-fc.com/docs/features$communication#props%20%E7%9B%B4%E5%87%BA%E6%95%B0%E6%8D%AE
import { App } from 'vue'
// import { useRouter } from 'vue-router'
import { createHead } from '@unhead/vue'
import { useApp } from 'ssr-common-utils'
const app = useApp()
const head = createHead()
app.use(head)

const props = defineProps<{
  ssrApp: App,
  ctx: any,
  asyncData: { value: any }
}>()
// const router = useRouter()
if (props.ctx) {
  props.ctx.head = head
}
</script>

<style lang="less">
@import '@/common.less';
</style>
