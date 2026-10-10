<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { VueFlow, useVueFlow, type Connection } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import type { WorkflowNode, WorkflowEdge, WorkflowNodeData } from '../../types/workflow'
import { NodeType, NODE_TYPE_META, NODE_TYPE_MAP } from '../../types/workflow'
import StartNode from './nodes/StartNode.vue'
import EndNode from './nodes/EndNode.vue'
import LLMNode from './nodes/LLMNode.vue'
import HttpNode from './nodes/HttpNode.vue'
import CodeNode from './nodes/CodeNode.vue'
import ConditionNode from './nodes/ConditionNode.vue'
import LoopNode from './nodes/LoopNode.vue'
import KnowledgeNode from './nodes/KnowledgeNode.vue'
import VariableNode from './nodes/VariableNode.vue'

const props = defineProps<{
  selectedNodeId: string | null
  selectedEdgeId: string | null
}>()

const emit = defineEmits<{
  (e: 'update:nodes', nodes: WorkflowNode[]): void
  (e: 'update:edges', edges: WorkflowEdge[]): void
  (e: 'node-click', nodeId: string): void
  (e: 'edge-click', edgeId: string): void
  (e: 'pane-click'): void
  (e: 'node-delete', nodeId: string): void
  (e: 'drop', nodeType: string, position: { x: number; y: number }): void
}>()

const flowRef = ref()
let nodeIdCounter = 0
function genNodeId() { return `node_${Date.now()}_${++nodeIdCounter}` }
function genEdgeId() { return `edge_${Date.now()}_${++nodeIdCounter}` }

const {
  nodes, edges, addNodes, addEdges, removeNodes,
  onNodeClick: vfNodeClick,
  onEdgeClick: vfEdgeClick,
  onPaneClick: vfPaneClick,
  onConnect: vfConnect,
} = useVueFlow<WorkflowNode, WorkflowEdge>()

// Events via hooks (avoids template @event fn-is-not-a-function bug)
vfNodeClick(({ node }) => { if (node) emit('node-click', node.id) })
vfEdgeClick(({ edge }) => { if (edge) emit('edge-click', edge.id) })
vfPaneClick(() => emit('pane-click'))
vfConnect((connection) => handleConnect(connection))

watch(nodes, (val) => emit('update:nodes', [...val]), { deep: true })
watch(edges, (val) => emit('update:edges', [...val]), { deep: true })

function addWorkflowNode(nodeType: NodeType, position: { x: number; y: number }, overrides?: Partial<WorkflowNodeData>): WorkflowNode {
  const meta = NODE_TYPE_META.find(m => m.type === nodeType)
  const id = genNodeId()
  const color = meta?.color || '#94A3B8'
  const node: WorkflowNode = {
    id,
    type: NODE_TYPE_MAP[nodeType],
    position,
    data: { nodeType, label: meta?.label || 'Unknown', description: '', color, ...overrides },
  }
  addNodes([node])
  return node
}

function handleConnect(connection: Connection) {
  addEdges([{
    ...connection,
    id: genEdgeId(),
    type: 'default',
    animated: false,
    style: { stroke: '#B0B8C4', strokeWidth: 1.5 },
  }])
}

function onNodeDelete(nodeId: string) { emit('node-delete', nodeId) }

function onDragOver(event: DragEvent) {
  event.preventDefault()
  if (event.dataTransfer) event.dataTransfer.dropEffect = 'move'
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  const nodeType = event.dataTransfer?.getData('application/node-type')
  if (!nodeType) return
  const pos = (flowRef.value as any)?.screenToFlowCoordinate?.({ x: event.clientX, y: event.clientY }) || { x: event.offsetX, y: event.offsetY }
  emit('drop', nodeType, pos)
}

onMounted(async () => {
  await nextTick()
  const s = addWorkflowNode(NodeType.START, { x: 80, y: 200 })
  const l = addWorkflowNode(NodeType.LLM, { x: 340, y: 200 }, { description: 'GPT-4o' })
  const c = addWorkflowNode(NodeType.CONDITION, { x: 600, y: 200 }, { label: 'Check Result', description: 'score > 0.8' })
  const e = addWorkflowNode(NodeType.END, { x: 860, y: 200 })
  setTimeout(() => {
    if (s && l) handleConnect({ source: s.id, target: l.id, sourceHandle: null, targetHandle: null })
    if (l && c) handleConnect({ source: l.id, target: c.id, sourceHandle: null, targetHandle: null })
    if (c && e) handleConnect({ source: c.id, target: e.id, sourceHandle: 'true', targetHandle: null })
  }, 100)
})

defineExpose({ addWorkflowNode, removeNodeById: (id: string) => removeNodes([id]) })
</script>

<template>
  <div class="flow-canvas-wrapper">
    <VueFlow
      ref="flowRef"
      class="flow-canvas"
      :nodes="nodes"
      :edges="edges"
      :default-viewport="{ x: 0, y: 0, zoom: 1 }"
      :min-zoom="0.2"
      :max-zoom="2"
      fit-view-on-init
      @dragover="onDragOver"
      @drop="onDrop"
    >
      <Background :gap="20" :size="1" />
      <Controls position="bottom-left" />

      <template #node-start-node="p"><StartNode v-bind="p" @delete="onNodeDelete" /></template>
      <template #node-end-node="p"><EndNode v-bind="p" @delete="onNodeDelete" /></template>
      <template #node-llm-node="p"><LLMNode v-bind="p" @delete="onNodeDelete" /></template>
      <template #node-http-node="p"><HttpNode v-bind="p" @delete="onNodeDelete" /></template>
      <template #node-code-node="p"><CodeNode v-bind="p" @delete="onNodeDelete" /></template>
      <template #node-condition-node="p"><ConditionNode v-bind="p" @delete="onNodeDelete" /></template>
      <template #node-loop-node="p"><LoopNode v-bind="p" @delete="onNodeDelete" /></template>
      <template #node-knowledge-node="p"><KnowledgeNode v-bind="p" @delete="onNodeDelete" /></template>
      <template #node-variable-node="p"><VariableNode v-bind="p" @delete="onNodeDelete" /></template>
    </VueFlow>
  </div>
</template>

<style scoped>
.flow-canvas-wrapper { flex: 1; min-height: 0; position: relative; }
.flow-canvas { width: 100%; height: 100%; }
</style>
