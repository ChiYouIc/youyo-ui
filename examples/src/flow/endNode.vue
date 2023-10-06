<template>
  <div class="end-node">
    <div class="end-node-circle"></div>
    <div class="end-node-text">流程结束</div>
  </div>
</template>
<script setup lang="ts"></script>

<style lang="less" scoped>
.end-node {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  text-align: left;
  user-select: none;
  margin-bottom: 56px;

  .end-node-circle {
    width: 10px;
    height: 10px;
    margin: auto;
    border-radius: 50%;
    background: rgb(202, 202, 202);
  }

  .end-node-text {
  }
}
</style>
