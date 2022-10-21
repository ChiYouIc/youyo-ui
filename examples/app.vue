<template>
<!--  <icon-view />-->
  <y-search-bar labelWidth="90">
    <y-search-bar-item label="操作状态" name="operationStatus">
      <a-select placeholder="请选择操作状态" allow-clear>
        <a-select-option value="SUCCESS">成功</a-select-option>
        <a-select-option value="ERROR">失败</a-select-option>
      </a-select>
    </y-search-bar-item>
  </y-search-bar>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import iconView from './src/iconView.vue';
export default defineComponent({
  name: 'app',
  components: { iconView },
});
</script>
<style lang="less">
.upload-demo {
  width: 100%;
}
</style>
