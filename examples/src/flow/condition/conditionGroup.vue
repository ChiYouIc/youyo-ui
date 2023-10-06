<template>
  <div class="condition-group">
    <div class="condition-group-node">
      <div class="add-condition-button-box">
        <button>添加条件</button>
      </div>
      <condition-node cover="left" />
      <condition-node />
      <condition-node />
      <condition-node />
      <condition-node />
      <condition-node cover="right" />
    </div>
    <add-node-button />
  </div>
</template>

<script setup lang="ts">
import ConditionNode from './conditionNode.vue';
import AddNodeButton from '../addNodeButton.vue';
</script>

<style scoped lang="less">
.condition-group {
  display: flex;
  flex-direction: column;
}

.condition-group-node {
  position: relative;
  display: flex;
  flex-direction: row;
  column-gap: 30px;
  overflow: visible;
  min-height: 180px;
  height: auto;
  border-bottom: 2px solid rgb(202, 202, 202);
  border-top: 2px solid rgb(202, 202, 202);
  border-right-color: rgb(202, 202, 202);
  border-left-color: rgb(202, 202, 202);
  margin-top: 10px;
}

.add-condition-button-box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);

  button {
    width: 80px;
    height: 30px;
    border: 0 solid rgb(217, 217, 217);
    border-radius: 15px;
    transform-origin: center center;
    cursor: pointer;
    z-index: 1;
    color: rgb(22, 119, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 4px 0;
    background-color: rgb(255, 255, 255);
  }
}
</style>
