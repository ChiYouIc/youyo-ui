<template>
  <div class="flow-node">
    <div class="node-box" @click="nodeSettingBind.onOpen()">
      <div class="title">{{ node.title }}</div>
      <div class="text">{{ node.text }}</div>
    </div>
    <add-node-button />
    <template v-if="node.child">
      <template v-if="node.child.type === 'condition'">
        <!--        <youyo-condition-node />-->
        <condition-group />
      </template>
      <template v-else>
        <youyo-node :node="node.child" />
      </template>
    </template>
  </div>
  <node-setting v-bind="nodeSettingBind" />
</template>

<script setup lang="ts" name="youyo-node">
import YouyoNode from './node.vue';
import NodeSetting from './setting/nodeSetting.vue';
import useNodeSetting from './setting/useNodeSetting.ts';
import YouyoConditionNode from './condition/conditionNode.vue';
import ConditionGroup from './condition/conditionGroup.vue';
import AddNodeButton from './addNodeButton.vue';

type NodeType = {
  title: string;
  icon: string;
  text: string;
  type: string;
  child?: NodeType;
};

type NodeProps = {
  node: NodeType;
};

defineProps<NodeProps>();

const nodeSettingBind = useNodeSetting();
</script>

<style lang="less" scoped>
.flow-node {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.node-box {
  position: relative;
  width: 240px;
  height: 120px;
  border: 0 solid rgb(217, 217, 217);
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border: 1.5px solid #69b1ff;
  }

  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    border-style: solid;
    border-width: 8px 6px 4px;
    border-color: rgb(202, 202, 202) transparent transparent;
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
    background-color: rgb(87, 106, 149);
  }

  .text {
  }
}

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
