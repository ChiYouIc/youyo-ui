<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TopToolbar from './components/layout/TopToolbar.vue'
import BottomStatusBar from './components/layout/BottomStatusBar.vue'
import NodePanel from './components/panel/NodePanel.vue'
import FlowCanvas from './components/canvas/FlowCanvas.vue'
import PropertyPanel from './components/setting/PropertyPanel.vue'
import { NodeType } from './types/workflow'
import type { WorkflowNode, WorkflowEdge } from './types/workflow'
import { useWorkflowState } from './composables/useWorkflowState'

const {
  workflowName,
  nodes,
  edges,
  selectedNodeId,
  selectedNode,
  nodeCount,
  edgeCount,
  selectNode,
  selectEdge,
  clearSelection,
  removeNodeById,
  handleKeydown,
} = useWorkflowState()

const flowCanvasRef = ref<InstanceType<typeof FlowCanvas> | null>(null)

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

function onDropOnCanvas(nodeType: string, position: { x: number; y: number }) {
  flowCanvasRef.value?.addWorkflowNode(nodeType as NodeType, position)
}

function onNodeDelete(nodeId: string) {
  flowCanvasRef.value?.removeNodeById(nodeId)
  removeNodeById(nodeId)
}
</script>

<template>
  <div class="app-layout">
    <TopToolbar
      :workflow-name="workflowName"
      @run="() => {}"
      @publish="() => {}"
      @save="() => {}"
      @undo="() => {}"
      @redo="() => {}"
    />

    <div class="app-body">
      <NodePanel @drag-start="() => {}" />

      <FlowCanvas
        ref="flowCanvasRef"
        :selected-node-id="selectedNodeId"
        :selected-edge-id="null"
        @update:nodes="(val: WorkflowNode[]) => nodes = val"
        @update:edges="(val: WorkflowEdge[]) => edges = val"
        @node-click="selectNode"
        @edge-click="selectEdge"
        @pane-click="clearSelection"
        @node-delete="onNodeDelete"
        @drop="onDropOnCanvas"
      />

      <PropertyPanel :selected-node="selectedNode" />
    </div>

    <BottomStatusBar
      :node-count="nodeCount"
      :edge-count="edgeCount"
      :zoom="1"
    />
  </div>
</template>

<style scoped>
.app-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-body {
  flex: 1;
  display: flex;
  min-height: 0;
  overflow: hidden;
}
</style>
