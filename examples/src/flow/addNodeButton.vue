<template>
  <div class="add-node-button-box">
    <a-button shape="circle">
      <template #icon>
        <PlusOutlined style="color: #cacaca" />
      </template>
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue';
</script>

<style scoped lang="less">
.add-node-button-box {
  position: relative;
  height: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: rgb(202, 202, 202);
  }
}
</style>
