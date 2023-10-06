<template>
  <div class="condition-node">
    <template v-if="cover">
      <div :class="[cover, 'top', 'cover']"></div>
    </template>
    <div class="condition-node-box">
      <div class="condition-node-content">
        <div class="title">xxx</div>
        <div class="text">xxx</div>
      </div>
      <add-node-button />
    </div>
    <template v-if="cover">
      <div :class="[cover, 'bottom', 'cover']"></div>
    </template>
  </div>
</template>
<script setup lang="ts">
import AddNodeButton from '../addNodeButton.vue';

type ConditionNodeProps = {
  cover?: 'left' | 'right';
};

defineProps<ConditionNodeProps>();
</script>

<style scoped lang="less">
.condition-node {
  display: flex;
  flex-direction: column;
  flex-flow: column wrap;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -10;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: rgb(202, 202, 202);
  }

  .cover {
    position: absolute;
    width: 50%;
    height: 2px;
    background-color: white;
  }

  .left {
    left: -1px;
  }

  .right {
    right: -1px;
  }

  .top {
    top: -2px;
  }

  .bottom {
    bottom: -2px;
  }
}

.condition-node-box {
  padding: 40px 20px 0 20px;
}

.condition-node-content {
  position: relative;
  width: 240px;
  height: 120px;
  border: 0 solid rgb(217, 217, 217);
  border-radius: 4px;
  cursor: pointer;
  background-color: white;

  &:hover {
    border: 1.5px solid #69b1ff;
  }

  &::before {
    content: '';
    //position: absolute;
    //top: -8px;
    //left: 50%;
    //transform: translateX(-50%);
    //width: 0;
    //height: 4px;
    //border-style: solid;
    //border-width: 8px 6px 4px;
    //border-color: rgb(202, 202, 202) transparent transparent;
    //background: rgb(245, 245, 247);
  }

  &::after {
    pointer-events: none;
    content: '';
    position: absolute;
    inset: 0;
    z-index: 2;
    border-radius: 4px;
    border: 1px solid transparent;
    transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1) 0s;
    box-shadow: rgba(0, 0, 0, 0.1) 0 2px 5px 0;
  }

  .title {
    //background-color: rgb(87, 106, 149);
  }

  .text {
  }
}
</style>
