<template>
  <div class="navigator-container">
    <div class="item">
      <AimOutlined class="btn" />
    </div>
    <div class="item">
      <SearchOutlined class="btn" />
    </div>
    <div class="item"><FullscreenOutlined class="btn" /></div>
    <div class="item"><FormOutlined class="btn" /></div>
    <div class="item">
      <div class="scale-container">
        <MinusOutlined />
        <a-input-number />
        <PlusOutlined />
      </div>
    </div>
    <div class="item"></div>
  </div>
</template>
<script setup lang="ts">
import '../style/navigator.less';
import { AimOutlined, MinusOutlined, PlusOutlined, SearchOutlined, FullscreenOutlined, FormOutlined } from '@ant-design/icons-vue';
</script>

<style scoped lang="less">
.navigator-container {
  padding: 0 12px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: hsla(0, 0%, 100%, 0.8);
  border-radius: 5px;
  opacity: 0.8;
  height: 44px;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 20px;

  .item {
    .btn {
      cursor: pointer;
      font-size: 18px;
    }
  }

  .scale-container {
    display: flex;
    align-items: center;
    column-gap: 5px;
  }
}
</style>
