<script setup>
import { ElMessage } from 'element-plus'

function openMessage() {
  ElMessage.success('success base 调整为 gray')
}
</script>

<template>
  <el-button type="primary" @click="openMessage">点击测试【unplugin-element-plus】</el-button>
  <div>测试插件【unplugin-vue-components】</div>
</template>
