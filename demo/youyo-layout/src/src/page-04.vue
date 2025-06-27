<!-- eslint-disable -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { VueFlow, useVueFlow, Panel } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import '@vue-flow/minimap/dist/style.css';
// import '@vue-flow/background/dist/style.css';

// Vue Flow 实例
const { onConnect, addEdges, addNodes, removeNodes, removeEdges, getNodes, getEdges } = useVueFlow();

// 初始节点和边
const initialNodes = ref([
  {
    id: '1',
    position: { x: 400, y: 200 },
    data: { label: '中心主题' },
    class: 'center-node',
  },
]);

const initialEdges = ref([]);

// 节点计数器
let nodeIdCounter = 2;

// 创建新节点
const createNode = (parentId: string, position: { x: number; y: number }) => {
  const newNode = {
    id: nodeIdCounter.toString(),
    position,
    data: { label: '新节点' },
    class: 'branch-node',
  };
  
  const newEdge = {
    id: `e${parentId}-${nodeIdCounter}`,
    source: parentId,
    target: nodeIdCounter.toString(),
    type: 'smoothstep',
  };
  
  addNodes([newNode]);
  addEdges([newEdge]);
  nodeIdCounter++;
};

// 处理连接
onConnect((connection) => {
  addEdges([
    {
      ...connection,
      type: 'smoothstep',
    },
  ]);
});

// 添加子节点
const addChildNode = () => {
  const nodes = getNodes.value;
  const centerNode = nodes.find(n => n.id === '1');
  if (centerNode) {
    const angle = (nodes.length - 1) * (Math.PI * 2 / 8);
    const radius = 200;
    const x = centerNode.position.x + Math.cos(angle) * radius;
    const y = centerNode.position.y + Math.sin(angle) * radius;
    
    createNode(centerNode.id, { x, y });
  }
};

// 删除选中节点
const deleteSelectedNodes = () => {
  const nodes = getNodes.value;
  const selectedNodes = nodes.filter(node => node.selected);
  const centerNode = selectedNodes.find(n => n.id === '1');
  
  if (centerNode) {
    alert('不能删除中心节点！');
    return;
  }
  
  if (selectedNodes.length > 0) {
    const nodeIds = selectedNodes.map(n => n.id);
    removeNodes(nodeIds);
  }
};

// 快捷键处理
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Delete' || e.key === 'Backspace') {
    deleteSelectedNodes();
  } else if (e.key === 'Tab') {
    e.preventDefault();
    addChildNode();
  }
};

// 导出脑图数据
const exportMindMap = () => {
  const nodes = getNodes.value;
  const edges = getEdges.value;
  const data = {
    nodes: nodes.map(n => ({
      id: n.id,
      label: n.data?.label,
      position: n.position,
    })),
    edges: edges.map(e => ({
      id: e.id,
      source: e.source,
      target: e.target,
    })),
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mindmap.json';
  a.click();
  URL.revokeObjectURL(url);
};

// 清空脑图
const clearMindMap = () => {
  if (confirm('确定要清空脑图吗？')) {
    const nodes = getNodes.value;
    const edges = getEdges.value;
    removeNodes(nodes.map(n => n.id));
    removeEdges(edges.map(e => e.id));
    
    // 重新添加中心节点
    addNodes([{
      id: '1',
      position: { x: 400, y: 200 },
      data: { label: '中心主题' },
      class: 'center-node',
    }]);
    nodeIdCounter = 2;
  }
};

// 编辑节点文本
const editNodeText = (nodeId: string) => {
  const newText = prompt('请输入新的文本：');
  if (newText !== null) {
    const nodes = getNodes.value;
    const nodeIndex = nodes.findIndex(n => n.id === nodeId);
    if (nodeIndex !== -1) {
      nodes[nodeIndex].data.label = newText;
    }
  }
};

// 节点双击事件
const onNodeDoubleClick = (event: { node: any }) => {
  editNodeText(event.node.id);
};

onMounted(() => {
  // 设置初始视图
  setTimeout(() => {
    const { fitView } = useVueFlow();
    fitView();
  }, 100);
});
</script>

<template>
  <div class="mind-map-container" @keydown="handleKeyDown" tabindex="0">
    <div class="toolbar">
      <h2>🧠 脑图工具</h2>
      <div class="toolbar-buttons">
        <button @click="addChildNode" class="btn btn-primary">
          ➕ 添加节点 (Tab)
        </button>
        <button @click="deleteSelectedNodes" class="btn btn-danger">
          🗑️ 删除选中 (Del)
        </button>
        <button @click="exportMindMap" class="btn btn-success">
          💾 导出脑图
        </button>
        <button @click="clearMindMap" class="btn btn-warning">
          🗑️ 清空脑图
        </button>
      </div>
    </div>
    
    <div class="flow-container">
      <VueFlow 
        v-model:nodes="initialNodes" 
        v-model:edges="initialEdges"
        @node-double-click="onNodeDoubleClick"
        fit-view-on-init
        :default-viewport="{ zoom: 1 }"
        :min-zoom="0.2"
        :max-zoom="4"
        class="vue-flow-basic-example"
      >
        <Background pattern-color="#aaa" :gap="20" />
        <MiniMap />
        <Controls />
        
        <Panel position="top-left" class="instructions-panel">
          <div class="instructions">
            <h3>🔥 使用说明</h3>
            <ul>
              <li>🎯 双击节点编辑文本</li>
              <li>⌨️ 按 Tab 键添加新节点</li>
              <li>🗑️ 选中节点后按 Delete 键删除</li>
              <li>🔗 拖拽节点边缘创建连接线</li>
              <li>🔍 滚轮缩放，拖拽移动视图</li>
              <li>🎨 使用工具栏管理脑图</li>
            </ul>
          </div>
        </Panel>
      </VueFlow>
    </div>
  </div>
</template>

<style scoped>
.mind-map-container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  outline: none;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.toolbar h2 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
}

.toolbar-buttons {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.btn-primary {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: white;
}

.btn-danger {
  background: linear-gradient(135deg, #ff4d4f 0%, #cf1322 100%);
  color: white;
}

.btn-success {
  background: linear-gradient(135deg, #52c41a 0%, #389e0d 100%);
  color: white;
}

.btn-warning {
  background: linear-gradient(135deg, #fa8c16 0%, #d48806 100%);
  color: white;
}

.flow-container {
  flex: 1;
  position: relative;
}

.vue-flow-basic-example {
  background: linear-gradient(135deg, #fafafa 0%, #f0f2f5 100%);
}

.instructions-panel {
  z-index: 1000;
}

.instructions {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  max-width: 280px;
  border: 1px solid #e8e8e8;
}

.instructions h3 {
  margin: 0 0 15px 0;
  color: #1890ff;
  font-size: 18px;
  font-weight: bold;
}

.instructions ul {
  margin: 0;
  padding-left: 0;
  list-style: none;
  color: #666;
}

.instructions li {
  margin-bottom: 8px;
  font-size: 14px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 3px solid #1890ff;
}

/* 自定义节点样式 */
:deep(.vue-flow__node) {
  cursor: pointer;
  padding: 12px 18px;
  border-radius: 12px;
  border: 2px solid #1890ff;
  background: white;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  transition: all 0.3s ease;
  min-width: 120px;
  text-align: center;
  font-weight: 500;
}

:deep(.vue-flow__node:hover) {
  transform: translateY(-3px);
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}

:deep(.vue-flow__node.center-node) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #5a6fd8;
  font-weight: bold;
  font-size: 16px;
}

:deep(.vue-flow__node.branch-node) {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  border-color: #52c41a;
  color: #333;
}

:deep(.vue-flow__node.selected) {
  box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.3);
  border-color: #ff4d4f;
}

/* 连接线样式 */
:deep(.vue-flow__edge-path) {
  stroke: #1890ff;
  stroke-width: 3;
}

:deep(.vue-flow__edge.selected .vue-flow__edge-path) {
  stroke: #ff4d4f;
  stroke-width: 4;
}

/* Handle 样式 */
:deep(.vue-flow__handle) {
  width: 12px;
  height: 12px;
  background: #1890ff;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  border-radius: 50%;
}

:deep(.vue-flow__handle:hover) {
  background: #40a9ff;
  transform: scale(1.3);
}

/* 小地图和控制器样式 */
:deep(.vue-flow__minimap) {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

:deep(.vue-flow__controls) {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

:deep(.vue-flow__controls-button) {
  background: white;
  border: none;
  color: #666;
  transition: all 0.3s ease;
  border-radius: 4px;
  margin: 2px;
}

:deep(.vue-flow__controls-button:hover) {
  background: #f0f2f5;
  color: #1890ff;
  transform: scale(1.1);
}

:deep(.vue-flow__panel) {
  background: transparent;
}
</style>
