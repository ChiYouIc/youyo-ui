<template>
<!--  <icon-view />-->
  <y-search-bar labelWidth="90">
    <y-search-bar-item label="操作状态" name="operationStatus">
      <a-select placeholder="请选择操作状态" style="width: 100%" allow-clear>
        <a-select-option value="SUCCESS">成功</a-select-option>
        <a-select-option value="ERROR">失败</a-select-option>
      </a-select>
    </y-search-bar-item>
    <y-search-bar-item label="操作状态" name="operationStatus">
      <a-select placeholder="请选择操作状态" style="width: 100%" allow-clear>
        <a-select-option value="SUCCESS">成功</a-select-option>
        <a-select-option value="ERROR">失败</a-select-option>
      </a-select>
    </y-search-bar-item>
    <y-search-bar-item label="操作状态" name="operationStatus">
      <a-select placeholder="请选择操作状态" style="width: 100%" allow-clear>
        <a-select-option value="SUCCESS">成功</a-select-option>
        <a-select-option value="ERROR">失败</a-select-option>
      </a-select>
    </y-search-bar-item>
    <y-search-bar-item label="操作状态" name="operationStatus">
      <a-select placeholder="请选择操作状态" style="width: 100%" allow-clear>
        <a-select-option value="SUCCESS">成功</a-select-option>
        <a-select-option value="ERROR">失败</a-select-option>
      </a-select>
    </y-search-bar-item>
<!--    <y-search-bar-item label="操作状态" name="operationStatus">-->
<!--      <a-select placeholder="请选择操作状态" style="width: 100%" allow-clear>-->
<!--        <a-select-option value="SUCCESS">成功</a-select-option>-->
<!--        <a-select-option value="ERROR">失败</a-select-option>-->
<!--      </a-select>-->
<!--    </y-search-bar-item>-->
<!--    <y-search-bar-item label="操作状态" name="operationStatus">-->
<!--      <a-select placeholder="请选择操作状态" style="width: 100%" allow-clear>-->
<!--        <a-select-option value="SUCCESS">成功</a-select-option>-->
<!--        <a-select-option value="ERROR">失败</a-select-option>-->
<!--      </a-select>-->
<!--    </y-search-bar-item>-->
<!--    <y-search-bar-item label="操作状态" name="operationStatus">-->
<!--      <a-select placeholder="请选择操作状态" style="width: 100%" allow-clear>-->
<!--        <a-select-option value="SUCCESS">成功</a-select-option>-->
<!--        <a-select-option value="ERROR">失败</a-select-option>-->
<!--      </a-select>-->
<!--    </y-search-bar-item>-->
    <y-search-bar-item label="操作状态" name="operationStatus">
      <a-select placeholder="请选择操作状态" v-model:value="a" style="width: 100%" allow-clear>
        <a-select-option value="SUCCESS">成功</a-select-option>
        <a-select-option value="ERROR">失败</a-select-option>
      </a-select>
    </y-search-bar-item>
    <template #bt>
      <a-button type="primary">搜索</a-button>
      <a-button>重置</a-button>
    </template>
  </y-search-bar>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';
import iconView from './src/iconView.vue';
export default defineComponent({
  name: 'app',
  components: { iconView },
  setup() {
    const  a = ref<string>('SUCCESS');
    return {
      a
    }
  }
});
</script>
<style lang="less">
.upload-demo {
  width: 100%;
}
</style>
