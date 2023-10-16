<template>
  <div :class="['youyo-node', clsMap[node.type]]">
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
      <y-flow-node-group v-if="isGroupNode(node.next)" :node="node.next" @remove="onRemove" />
      <y-flow-node v-else :node="node.next" @remove="onRemove" />
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
import YFlowNodeGroup from '../group/index.vue';
import YFlowNodeSetting from '../setting/index.vue';
import YFlowAddButton from '../add/index.vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import { NodeMode, NodeType } from '../types.ts';
import { useNodeSetting } from '../hooks/index';
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

const nodeSettingBind = useNodeSetting(props.node);

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
