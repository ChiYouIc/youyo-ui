<template>
  <div class="add-node-button-box">
    <a-popover v-model:visible="hovered" title="节点类型" trigger="click" placement="right">
      <a-button shape="circle">
        <template #icon>
          <PlusOutlined style="color: #cacaca" />
        </template>
      </a-button>
      <template #content>
        <div class="add-node-popover">
          <div class="add-node-popover-body">
            <div class="add-node-popover-item approval" @click="approval(node)">
              <div class="item-wrapper">
                <approval-icon />
              </div>
              <span>审批节点</span>
            </div>
            <div class="add-node-popover-item" @click="cc(node)">
              <div class="item-wrapper">
                <cc-icon />
              </div>
              <span>抄送节点</span>
            </div>
            <div class="add-node-popover-item" @click="onAdd(node)">
              <div class="item-wrapper">
                <file-protect-icon />
              </div>
              <span>办理</span>
            </div>
            <div class="add-node-popover-item" @click="group(node)">
              <div class="item-wrapper">
                <condition-icon />
              </div>
              <span>条件分支</span>
            </div>
            <div class="add-node-popover-item" @click="onAdd(node)">
              <div class="item-wrapper">
                <cc-icon />
              </div>
              <span>抄送节点</span>
            </div>
            <div class="add-node-popover-item" @click="onAdd(node)">
              <div class="item-wrapper">
                <cc-icon />
              </div>
              <span>抄送节点</span>
            </div>
          </div>
        </div>
      </template>
    </a-popover>
  </div>
</template>

<script setup lang="ts" name="y-flow-add-button">
import './style/index.less';
import { PlusOutlined } from '@ant-design/icons-vue';
import { NodeMode, NodeType } from '../types';
import { ApprovalIcon, CcIcon, ConditionIcon, FileProtectIcon } from '../icon/index';
import { ref } from 'vue';

const props = defineProps<{ node: NodeType }>();

const hovered = ref<boolean>(false);

function approval(node: NodeType) {
  hovered.value = false;

  node.next = {
    title: '审批节点',
    icon: 'xxxxx',
    text: '审批节点',
    type: NodeMode.NODE,
    next: node.next,
  };
}

function cc(node: NodeType) {
  node.next = {
    title: '抄送节点',
    icon: 'xxxxx',
    text: '抄送节点',
    type: NodeMode.NODE,
    next: node.next,
  };
  hovered.value = false;
  console.log(hovered);
}

function group(node: NodeType) {
  node.next = {
    title: 'new组节点',
    icon: 'xxxxx',
    text: 'new组节点',
    type: NodeMode.GROUP,
    next: node.next,
    groupList: [
      {
        title: '条件节点1',
        icon: 'xxxxx',
        text: '条件节点1',
        type: NodeMode.CONDITION,
      },
      {
        title: '条件节点2',
        icon: 'xxxxx',
        text: '条件节点2',
        type: NodeMode.CONDITION,
      },
    ],
  };
  hovered.value = false;
}

function onAdd(node: NodeType) {
  node.next = {
    title: '1111',
    icon: 'xxxxx',
    text: 'xxxxxxxxxx',
    type: NodeMode.NODE,
    next: props.node.next,
  };
  hovered.value = false;
}
</script>

<style scoped lang="less"></style>
