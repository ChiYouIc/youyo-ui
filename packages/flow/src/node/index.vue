<template>
  <div :class="['flow-node', isConditionNode(node) ? 'condition-node' : null]">
    <template v-if="cover">
      <div :class="[cover, 'top', 'cover']"></div>
    </template>
    <div class="node-box">
      <div :class="['node-content']" @click="nodeSettingBind.onOpen()">
        <div class="title">{{ node.title }}</div>
        <div class="text">{{ node.text }} - {{ cover }}</div>
        <div class="closed">
          <CloseCircleOutlined @click.stop="$emit('remove')" />
        </div>
      </div>
      <add-node-button v-if="!isEndNode(node)" :node="node" />
    </div>
    <template v-if="node.next && !isEndNode(node)">
      <template v-if="isGroupNode(node.next)">
        <y-flow-node-group :node="node.next" />
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
import AddNodeButton from './addNodeButton.vue';
import { NodeType } from '../types.ts';
import { CloseCircleOutlined } from '@ant-design/icons-vue';
import { isConditionNode, isEndNode, isGroupNode } from '../utils.ts';

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
</script>
