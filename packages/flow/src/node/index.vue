<template>
  <div :class="['flow-node', clsMap[node.type]]">
    <template v-if="cover">
      <div :class="[cover, 'top', 'cover']"></div>
    </template>
    <!--  当前节点  -->
    <div class="node-box">
      <div :class="['node-content']" @click="nodeSettingBind.onOpen()">
        <div class="title">
          <span>{{ node.title }}</span>
          <span>{{ node.title }}</span>
        </div>
        <div class="text">{{ node.text }} - {{ cover }}</div>
        <div class="closed">
          <CloseOutlined @click.stop="$emit('remove')" />
        </div>
      </div>
      <y-flow-add-button v-if="!isEndNode(node)" :node="node" />
    </div>
    <!--  下一个节点  -->
    <template v-if="node.next && !isEndNode(node)">
      <template v-if="isGroupNode(node.next)">
        <y-flow-node-group :node="node.next" @remove="onRemove" />
      </template>
      <template v-else>
        <y-flow-node :node="node.next" @remove="onRemove" />
      </template>
    </template>
    <template v-if="cover">
      <div :class="[cover, 'bottom', 'cover']"></div>
    </template>
  </div>
  <y-flow-node-setting v-bind="nodeSettingBind" />
</template>

<script setup lang="ts" name="y-flow-node">
import './style/index.less';
import YFlowNode from './index.vue';
import YFlowNodeGroup from './nodeGroup.vue';
import YFlowNodeSetting from './setting/nodeSetting.vue';
import useNodeSetting from './setting/useNodeSetting.ts';
import YFlowAddButton from './add/index.vue';
import { NodeMode, NodeType } from '../types.ts';
import { CloseOutlined } from '@ant-design/icons-vue';
import { isEndNode, isGroupNode } from '../utils.ts';

type NodeProps = {
  node: NodeType;
  cover?: 'left' | 'right';
};

interface NodeEmits {
  (event: 'remove'): void;
}

const props = defineProps<NodeProps>();
defineEmits<NodeEmits>();

const nodeSettingBind = useNodeSetting();

function onRemove() {
  props.node!.next = props.node!.next!.next;
}

const clsMap = {
  [NodeMode.START]: 'start-node',
  [NodeMode.END]: 'end-node',
  [NodeMode.NODE]: 'normal-node',
  [NodeMode.CONDITION]: 'condition-node',
  [NodeMode.GROUP]: 'group-node',
};
</script>
