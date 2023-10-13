<template>
  <div class="add-node-button-box">
    <a-popover v-model:open="visible" title="节点类型" trigger="click" placement="right">
      <a-button shape="circle">
        <template #icon>
          <PlusOutlined style="color: #cacaca" />
        </template>
      </a-button>
      <template #content>
        <div class="add-node-popover">
          <div class="add-node-popover-body">
            <div class="add-node-popover-item approval" @click="onAdd(node)">
              <div class="item-wrapper">
                <approval-icon />
              </div>
              <span>审批节点</span>
            </div>
            <div class="add-node-popover-item" @click="onAdd(node)">
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
            <div class="add-node-popover-item" @click="onAdd(node)">
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
import '../style/add.less';
import { PlusOutlined } from '@ant-design/icons-vue';
import { NodeMode, NodeType } from '../../types';
import ApprovalIcon from './approvalIcon.vue';
import CcIcon from './ccIcon.vue';
import FileProtectIcon from './fileProtectIcon.vue';
import ConditionIcon from './conditionIcon.vue';
import { ref } from 'vue';

const props = defineProps<{ node: NodeType }>();
const visible = ref<boolean>(false);

function onAdd(node: NodeType) {
  node.next = {
    title: '1111',
    icon: 'xxxxx',
    text: 'xxxxxxxxxx',
    type: NodeMode.NODE,
    next: props.node.next,
  };
  visible.value = false;
}
</script>

<style scoped lang="less"></style>
