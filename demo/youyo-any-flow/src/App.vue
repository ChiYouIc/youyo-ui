<script setup lang="ts">
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { type Connection, type Edge, type EdgeChange, type Node, type NodeChange, addEdge, applyChanges, VueFlow } from '@vue-flow/core'
import { ref } from 'vue'

interface WorkflowNode {
  label: string
}

const initialNodes: Node<WorkflowNode>[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 80, y: 40 },
    data: { label: '开始节点' },
  },
  {
    id: '2',
    type: 'default',
    position: { x: 300, y: 180 },
    data: { label: '审批节点' },
  },
  {
    id: '3',
    type: 'default',
    position: { x: 560, y: 40 },
    data: { label: '结束节点' },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
]

const nodes = ref<Node<WorkflowNode>[]>(initialNodes)
const edges = ref<Edge[]>(initialEdges)

const onNodesChange = (changes: NodeChange[]) => {
  nodes.value = applyChanges(changes, nodes.value)
}

const onEdgesChange = (changes: EdgeChange[]) => {
  edges.value = applyChanges(changes, edges.value)
}

const onConnect = (connection: Connection) => {
  edges.value = addEdge(connection, edges.value)
}
</script>

<template>
  <a-layout class="workflow-page">
    <a-layout-header class="topbar">
      <div class="brand">
        <div class="brand-title">工作流设计器</div>
        <div class="brand-subtitle">vue-flow + YouYo</div>
      </div>
      <a-space size="middle">
        <a-button type="primary">保存</a-button>
        <a-button>撤销</a-button>
        <a-button>重做</a-button>
      </a-space>
    </a-layout-header>

    <a-layout has-sider class="layout">
      <a-layout-sider width="300" class="sidebar" theme="light">
        <a-card title="节点库" size="small" class="panel-card">
          <a-space direction="vertical" style="width: 100%">
            <a-button block type="default">开始节点</a-button>
            <a-button block type="default">审批节点</a-button>
            <a-button block type="default">条件节点</a-button>
            <a-button block type="default">结束节点</a-button>
          </a-space>
        </a-card>

        <a-card title="属性面板" size="small" class="panel-card">
          <a-typography-text type="secondary">请选择画布中的节点查看属性</a-typography-text>
        </a-card>
      </a-layout-sider>

      <a-layout-content class="content">
        <div class="flow-wrapper">
          <VueFlow
            class="flow-canvas"
            :nodes="nodes"
            :edges="edges"
            @nodes-change="onNodesChange"
            @edges-change="onEdgesChange"
            @connect="onConnect"
          >
            <Background gap="24" size="1" />
            <Controls />
          </VueFlow>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.workflow-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 56px;
  background: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}

.brand {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.brand-title {
  font-size: 16px;
  font-weight: 600;
}

.brand-subtitle {
  font-size: 12px;
}

.toolbar {
  display: flex;
  gap: 8px;
}

.layout {
  display: flex;
  flex: 1;
  min-height: 0;
  gap: 0;
}

.sidebar {
  height: 100%;
  padding: 16px 12px 16px 12px;
  box-sizing: border-box;
}

.panel-card {
  margin-bottom: 12px;
  border-radius: 8px;
}

.content {
  /* remove horizontal padding so content sits flush with sider */
  /* padding: 12px 0 12px 0; */
}

.canvas-header {
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
}

.flow-wrapper {
  flex: 1;
  min-height: 0;
  margin: 0; /* remove left/right margin so it aligns with sider */
  border-radius: 8px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.flow-canvas {
  width: 100%;
  height: 100%;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
