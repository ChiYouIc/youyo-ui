<template>
  <div class="workflow-editor">
    <!-- 顶部工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="btn btn-primary" @click="saveWorkflow">保存流程</button>
        <button class="btn btn-secondary" @click="clearWorkflow">清空画布</button>
        <button class="btn btn-secondary" @click="exportWorkflow">导出JSON</button>
        <input ref="fileInput" type="file" accept=".json" style="display: none" @change="importWorkflow" />
        <button class="btn btn-secondary" @click="fileInput?.click()">导入JSON</button>
      </div>
      <div class="toolbar-right">
        <button class="btn btn-success" @click="runWorkflow">运行流程</button>
      </div>
    </div>

    <div class="editor-content">
      <!-- 左侧节点面板 -->
      <div class="node-panel">
        <h3>节点库</h3>
        <div class="node-categories">
          <div class="category">
            <h4>基础节点</h4>
            <div v-for="node in basicNodes" :key="node.type" class="node-item" draggable="true" @dragstart="onDragStart($event, node)">
              <div class="node-icon" :style="{ backgroundColor: node.color }">
                {{ node.icon }}
              </div>
              <span>{{ node.label }}</span>
            </div>
          </div>

          <div class="category">
            <h4>逻辑节点</h4>
            <div v-for="node in logicNodes" :key="node.type" class="node-item" draggable="true" @dragstart="onDragStart($event, node)">
              <div class="node-icon" :style="{ backgroundColor: node.color }">
                {{ node.icon }}
              </div>
              <span>{{ node.label }}</span>
            </div>
          </div>

          <div class="category">
            <h4>API节点</h4>
            <div v-for="node in apiNodes" :key="node.type" class="node-item" draggable="true" @dragstart="onDragStart($event, node)">
              <div class="node-icon" :style="{ backgroundColor: node.color }">
                {{ node.icon }}
              </div>
              <span>{{ node.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 主画布区域 -->
      <div class="flow-container" @drop="onDrop" @dragover="onDragOver">
        <VueFlow
          v-model:nodes="nodes"
          v-model:edges="edges"
          class="vue-flow"
          @node-click="onNodeClick"
          @node-double-click="onNodeDoubleClick"
          @edge-click="onEdgeClick"
          @connect="onConnect"
          @node-drag-stop="onNodeDragStop"
        >
          <!-- 背景 -->
          <Background pattern-color="#aaa" :gap="16" />

          <!-- 控制器 -->
          <Controls />

          <!-- 小地图 -->
          <MiniMap />

          <!-- 自定义节点模板 -->
          <template #node-start="{ data }">
            <div class="custom-node start-node">
              <div class="node-header">
                <span class="node-icon">🚀</span>
                <span class="node-title">{{ data.label }}</span>
              </div>
              <!-- 只有输出连接点 -->
              <Handle type="source" :position="Position.Right" class="node-handle" />
            </div>
          </template>

          <template #node-process="{ data }">
            <div class="custom-node process-node">
              <!-- 输入连接点 -->
              <Handle type="target" :position="Position.Left" class="node-handle" />
              <div class="node-header">
                <span class="node-icon">⚙️</span>
                <span class="node-title">{{ data.label }}</span>
              </div>
              <div class="node-content">
                <p>{{ data.description || '处理节点' }}</p>
              </div>
              <!-- 输出连接点 -->
              <Handle type="source" :position="Position.Right" class="node-handle" />
            </div>
          </template>

          <template #node-condition="{ data }">
            <div class="custom-node condition-node">
              <!-- 输入连接点 -->
              <Handle type="target" :position="Position.Left" class="node-handle" />
              <div class="node-header">
                <span class="node-icon">❓</span>
                <span class="node-title">{{ data.label }}</span>
              </div>
              <div class="node-content">
                <p>{{ data.condition || '条件判断' }}</p>
              </div>
              <!-- 两个输出连接点：是/否 -->
              <Handle type="source" :position="Position.Right" id="yes" class="node-handle handle-yes" style="top: 30%" />
              <Handle type="source" :position="Position.Right" id="no" class="node-handle handle-no" style="top: 70%" />
            </div>
          </template>

          <template #node-api="{ data }">
            <div class="custom-node api-node">
              <!-- 输入连接点 -->
              <Handle type="target" :position="Position.Left" class="node-handle" />
              <div class="node-header">
                <span class="node-icon">🌐</span>
                <span class="node-title">{{ data.label }}</span>
              </div>
              <div class="node-content">
                <p>{{ data.url || 'API调用' }}</p>
              </div>
              <!-- 输出连接点 -->
              <Handle type="source" :position="Position.Right" class="node-handle" />
            </div>
          </template>

          <template #node-parallel="{ data }">
            <div class="custom-node parallel-node">
              <!-- 输入连接点 -->
              <Handle type="target" :position="Position.Left" class="node-handle" />
              <div class="node-header">
                <span class="node-icon">🔀</span>
                <span class="node-title">{{ data.label }}</span>
              </div>
              <!-- 多个输出连接点 -->
              <Handle type="source" :position="Position.Right" id="out1" class="node-handle" style="top: 30%" />
              <Handle type="source" :position="Position.Right" id="out2" class="node-handle" style="top: 70%" />
            </div>
          </template>

          <template #node-merge="{ data }">
            <div class="custom-node merge-node">
              <!-- 多个输入连接点 -->
              <Handle type="target" :position="Position.Left" id="in1" class="node-handle" style="top: 30%" />
              <Handle type="target" :position="Position.Left" id="in2" class="node-handle" style="top: 70%" />
              <div class="node-header">
                <span class="node-icon">🔄</span>
                <span class="node-title">{{ data.label }}</span>
              </div>
              <!-- 输出连接点 -->
              <Handle type="source" :position="Position.Right" class="node-handle" />
            </div>
          </template>

          <template #node-database="{ data }">
            <div class="custom-node database-node">
              <!-- 输入连接点 -->
              <Handle type="target" :position="Position.Left" class="node-handle" />
              <div class="node-header">
                <span class="node-icon">🗄️</span>
                <span class="node-title">{{ data.label }}</span>
              </div>
              <!-- 输出连接点 -->
              <Handle type="source" :position="Position.Right" class="node-handle" />
            </div>
          </template>

          <template #node-email="{ data }">
            <div class="custom-node email-node">
              <!-- 输入连接点 -->
              <Handle type="target" :position="Position.Left" class="node-handle" />
              <div class="node-header">
                <span class="node-icon">📧</span>
                <span class="node-title">{{ data.label }}</span>
              </div>
              <!-- 输出连接点 -->
              <Handle type="source" :position="Position.Right" class="node-handle" />
            </div>
          </template>

          <template #node-end="{ data }">
            <div class="custom-node end-node">
              <!-- 只有输入连接点 -->
              <Handle type="target" :position="Position.Left" class="node-handle" />
              <div class="node-header">
                <span class="node-icon">🏁</span>
                <span class="node-title">{{ data.label }}</span>
              </div>
            </div>
          </template>
        </VueFlow>
      </div>

      <!-- 右侧属性面板 -->
      <div v-if="selectedNode" class="property-panel">
        <h3>节点属性</h3>
        <div class="property-form">
          <div class="form-group">
            <label>节点标题：</label>
            <input v-model="selectedNode.data.label" @input="updateNode" />
          </div>

          <div v-if="selectedNode.type === 'process'" class="form-group">
            <label>描述：</label>
            <textarea v-model="selectedNode.data.description" @input="updateNode"></textarea>
          </div>

          <div v-if="selectedNode.type === 'condition'" class="form-group">
            <label>条件表达式：</label>
            <input v-model="selectedNode.data.condition" @input="updateNode" />
          </div>

          <div v-if="selectedNode.type === 'api'" class="form-group">
            <label>API地址：</label>
            <input v-model="selectedNode.data.url" @input="updateNode" />
            <label>请求方法：</label>
            <select v-model="selectedNode.data.method" @change="updateNode">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          <div class="form-group">
            <label>位置 X：</label>
            <input v-model="selectedNode.position.x" type="number" @input="updateNode" />
            <label>位置 Y：</label>
            <input v-model="selectedNode.position.y" type="number" @input="updateNode" />
          </div>

          <div class="form-actions">
            <button class="btn btn-danger" @click="deleteNode">删除节点</button>
          </div>
        </div>
      </div>

      <!-- 边属性面板 -->
      <div v-else-if="selectedEdge" class="property-panel">
        <h3>连线属性</h3>
        <div class="property-form">
          <div class="form-group">
            <label>标签：</label>
            <input v-model="selectedEdge.label" @input="updateEdge" />
          </div>
          <div class="form-group">
            <label>条件：</label>
            <input v-model="selectedEdge.data.condition" @input="updateEdge" />
          </div>
          <div class="form-actions">
            <button class="btn btn-danger" @click="deleteEdge">删除连线</button>
          </div>
        </div>
      </div>

      <!-- 默认属性面板 -->
      <div v-else class="property-panel">
        <h3>属性面板</h3>
        <p>请选择一个节点或连线来编辑属性</p>
        <div class="workflow-info">
          <h4>流程信息</h4>
          <p>节点数量: {{ nodes.length }}</p>
          <p>连线数量: {{ edges.length }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { VueFlow, Handle, Position } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import type { Node, Edge, Connection, NodeMouseEvent, EdgeMouseEvent } from '@vue-flow/core';

// 节点数据接口定义
interface NodeData {
  label: string;
  description?: string;
  condition?: string;
  url?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

// 边数据接口定义
interface EdgeData {
  condition?: string;
}

// 节点类型定义
interface NodeTemplate {
  type: string;
  label: string;
  icon: string;
  color: string;
}

// 工作流数据定义
interface WorkflowData {
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
  timestamp: string;
}

// 节点和边的数据
const nodes = ref<Node<NodeData>[]>([]);
const edges = ref<Edge<EdgeData>[]>([]);

// 选中的节点和边
const selectedNode = ref<Node<NodeData> | null>(null);
const selectedEdge = ref<Edge<EdgeData> | null>(null);

// 文件输入元素引用
const fileInput = ref<HTMLInputElement | null>(null);

// 节点ID计数器
let nodeIdCounter = 1;
let edgeIdCounter = 1;

// 节点库定义
const basicNodes = ref<NodeTemplate[]>([
  { type: 'start', label: '开始', icon: '🚀', color: '#4caf50' },
  { type: 'process', label: '处理', icon: '⚙️', color: '#2196f3' },
  { type: 'end', label: '结束', icon: '🏁', color: '#f44336' },
]);

const logicNodes = ref<NodeTemplate[]>([
  { type: 'condition', label: '条件判断', icon: '❓', color: '#ff9800' },
  { type: 'parallel', label: '并行处理', icon: '🔀', color: '#9c27b0' },
  { type: 'merge', label: '汇聚', icon: '🔄', color: '#607d8b' },
]);

const apiNodes = ref<NodeTemplate[]>([
  { type: 'api', label: 'API调用', icon: '🌐', color: '#00bcd4' },
  { type: 'database', label: '数据库', icon: '🗄️', color: '#795548' },
  { type: 'email', label: '邮件发送', icon: '📧', color: '#e91e63' },
]);

// 拖拽相关方法
const onDragStart = (event: DragEvent, nodeType: NodeTemplate): void => {
  if (!event.dataTransfer) return;
  event.dataTransfer.setData('application/vueflow', JSON.stringify(nodeType));
  event.dataTransfer.effectAllowed = 'move';
};

const onDragOver = (event: DragEvent): void => {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
};

const onDrop = (event: DragEvent): void => {
  event.preventDefault();
  if (!event.dataTransfer) return;

  const data: NodeTemplate = JSON.parse(event.dataTransfer.getData('application/vueflow'));

  // 获取画布坐标
  const flowContainer = event.currentTarget as HTMLElement;
  const rect = flowContainer.getBoundingClientRect();
  const position = {
    x: event.clientX - rect.left - 100, // 减去节点宽度的一半
    y: event.clientY - rect.top - 40, // 减去节点高度的一半
  };

  // 创建新节点
  const newNode: Node<NodeData> = {
    id: `${data.type}-${nodeIdCounter++}`,
    type: data.type,
    position,
    data: {
      label: data.label,
      description: '',
      condition: '',
      url: '',
      method: 'GET',
    },
  };

  nodes.value.push(newNode);
};

// 节点事件处理
const onNodeClick = (event: NodeMouseEvent): void => {
  selectedNode.value = event.node as Node<NodeData>;
  selectedEdge.value = null;
};

const onNodeDoubleClick = (event: NodeMouseEvent): void => {
  // 双击编辑节点
  const node = event.node as Node<NodeData>;
  const newLabel = prompt('请输入新的节点标题:', node.data.label);
  if (newLabel) {
    node.data.label = newLabel;
    updateNode();
  }
};

const onEdgeClick = (event: EdgeMouseEvent): void => {
  selectedEdge.value = event.edge as Edge<EdgeData>;
  selectedNode.value = null;
};

const onConnect = (connection: Connection): void => {
  const newEdge: Edge<EdgeData> = {
    id: `edge-${edgeIdCounter++}`,
    ...connection,
    type: 'default',
    data: { condition: '' },
    label: '',
  };
  edges.value.push(newEdge);
};

const onNodeDragStop = (event: NodeMouseEvent): void => {
  // 节点拖拽结束后更新位置
  if (selectedNode.value && selectedNode.value.id === event.node.id) {
    selectedNode.value.position = event.node.position;
  }
};

// 更新方法
const updateNode = (): void => {
  if (!selectedNode.value) return;
  const nodeIndex = nodes.value.findIndex(n => n.id === selectedNode.value!.id);
  if (nodeIndex !== -1) {
    nodes.value[nodeIndex] = { ...selectedNode.value };
  }
};

const updateEdge = (): void => {
  if (!selectedEdge.value) return;
  const edgeIndex = edges.value.findIndex(e => e.id === selectedEdge.value!.id);
  if (edgeIndex !== -1) {
    edges.value[edgeIndex] = { ...selectedEdge.value };
  }
};

// 删除方法
const deleteNode = (): void => {
  if (!selectedNode.value) return;
  nodes.value = nodes.value.filter(n => n.id !== selectedNode.value!.id);
  // 删除相关的边
  edges.value = edges.value.filter(e => e.source !== selectedNode.value!.id && e.target !== selectedNode.value!.id);
  selectedNode.value = null;
};

const deleteEdge = (): void => {
  if (!selectedEdge.value) return;
  edges.value = edges.value.filter(e => e.id !== selectedEdge.value!.id);
  selectedEdge.value = null;
};

// 工具栏方法
const saveWorkflow = (): void => {
  const workflow: WorkflowData = {
    nodes: nodes.value,
    edges: edges.value,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem('workflow', JSON.stringify(workflow));
  alert('流程已保存到本地存储');
};

const clearWorkflow = (): void => {
  if (confirm('确定要清空整个画布吗？')) {
    nodes.value = [];
    edges.value = [];
    selectedNode.value = null;
    selectedEdge.value = null;
  }
};

const exportWorkflow = (): void => {
  const workflow: WorkflowData = {
    nodes: nodes.value,
    edges: edges.value,
    timestamp: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `workflow-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

const importWorkflow = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const workflow: WorkflowData = JSON.parse(result);
          nodes.value = workflow.nodes || [];
          edges.value = workflow.edges || [];
          selectedNode.value = null;
          selectedEdge.value = null;

          // 更新计数器
          const maxNodeId = Math.max(
            ...nodes.value.map(n => {
              const match = n.id.match(/-(\d+)$/);
              return match ? parseInt(match[1]) : 0;
            }),
            0,
          );
          nodeIdCounter = maxNodeId + 1;

          const maxEdgeId = Math.max(
            ...edges.value.map(e => {
              const match = e.id.match(/-(\d+)$/);
              return match ? parseInt(match[1]) : 0;
            }),
            0,
          );
          edgeIdCounter = maxEdgeId + 1;

          alert('流程导入成功');
        }
      } catch (error) {
        alert('导入失败：文件格式错误');
      }
    };
    reader.readAsText(file);
  }
};

const runWorkflow = (): void => {
  if (nodes.value.length === 0) {
    alert('请先添加节点');
    return;
  }

  // 简单的流程验证
  const startNodes = nodes.value.filter(n => n.type === 'start');
  if (startNodes.length === 0) {
    alert('流程必须包含至少一个开始节点');
    return;
  }

  alert('流程验证通过，开始执行...\n(这里可以集成实际的执行引擎)');
};

// 初始化：尝试从本地存储加载
const loadWorkflow = (): void => {
  try {
    const saved = localStorage.getItem('workflow');
    if (saved) {
      const workflow: WorkflowData = JSON.parse(saved);
      nodes.value = workflow.nodes || [];
      edges.value = workflow.edges || [];
    }
  } catch (error) {
    console.warn('加载保存的流程失败:', error);
  }
};

// 组件挂载时加载流程
nextTick(() => {
  loadWorkflow();
});
</script>

<style scoped>
.workflow-editor {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.toolbar {
  height: 60px;
  background: white;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
}

.toolbar-left,
.toolbar-right {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.btn-primary {
  background: #1890ff;
  color: white;
}

.btn-primary:hover {
  background: #40a9ff;
}

.btn-secondary {
  background: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background: #d9d9d9;
}

.btn-success {
  background: #52c41a;
  color: white;
}

.btn-success:hover {
  background: #73d13d;
}

.btn-danger {
  background: #ff4d4f;
  color: white;
}

.btn-danger:hover {
  background: #ff7875;
}

.editor-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.node-panel {
  width: 250px;
  background: white;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  padding: 20px;
}

.node-panel h3 {
  margin: 0 0 20px 0;
  color: #333;
}

.category {
  margin-bottom: 25px;
}

.category h4 {
  margin: 0 0 12px 0;
  color: #666;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.node-item {
  display: flex;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  cursor: grab;
  transition: all 0.3s;
}

.node-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.node-item:active {
  cursor: grabbing;
}

.node-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 16px;
  color: white;
}

.flow-container {
  flex: 1;
  position: relative;
}

.vue-flow {
  background: #fafafa;
}

.property-panel {
  width: 300px;
  background: white;
  border-left: 1px solid #ddd;
  padding: 20px;
  overflow-y: auto;
}

.property-panel h3 {
  margin: 0 0 20px 0;
  color: #333;
}

.property-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 500;
  color: #555;
  font-size: 14px;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgb(24 144 255 / 20%);
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.workflow-info {
  margin-top: 30px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
}

.workflow-info h4 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 16px;
}

.workflow-info p {
  margin: 8px 0;
  color: #666;
  font-size: 14px;
}

/* 自定义节点样式 */
.custom-node {
  min-width: 120px;
  background: white;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  transition: all 0.3s;
}

.custom-node:hover {
  box-shadow: 0 4px 16px rgb(0 0 0 / 25%);
  transform: translateY(-2px);
}

.node-header {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #eee;
}

.node-header .node-icon {
  margin-right: 8px;
  font-size: 16px;
}

.node-title {
  font-weight: 500;
  color: #333;
  font-size: 14px;
}

.node-content {
  padding: 8px 12px;
  font-size: 12px;
  color: #666;
  max-width: 160px;
  word-wrap: break-word;
}

.start-node {
  border-color: #4caf50;
}

.start-node .node-header {
  background: #4caf50;
  color: white;
}

.process-node {
  border-color: #2196f3;
}

.process-node .node-header {
  background: #2196f3;
  color: white;
}

.condition-node {
  border-color: #ff9800;
}

.condition-node .node-header {
  background: #ff9800;
  color: white;
}

.api-node {
  border-color: #00bcd4;
}

.api-node .node-header {
  background: #00bcd4;
  color: white;
}

.end-node {
  border-color: #f44336;
}

.end-node .node-header {
  background: #f44336;
  color: white;
}

/* Vue Flow 相关样式覆盖 */
:deep(.vue-flow__node.selected) {
  box-shadow: 0 0 0 3px rgb(24 144 255 / 30%);
}

:deep(.vue-flow__edge.selected .vue-flow__edge-path) {
  stroke: #1890ff;
  stroke-width: 3;
}

:deep(.vue-flow__controls) {
  bottom: 20px;
  left: 20px;
}

:deep(.vue-flow__minimap) {
  bottom: 20px;
  right: 20px;
}

/* 连接点样式 */
.node-handle {
  width: 12px;
  height: 12px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: #1890ff;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);
}

.node-handle:hover {
  background: #40a9ff;
  transform: scale(1.2);
}

.handle-yes {
  background: #52c41a;
}

.handle-no {
  background: #ff4d4f;
}

/* 节点样式调整 */
.parallel-node {
  border-color: #9c27b0;
}

.parallel-node .node-header {
  background: #9c27b0;
  color: white;
}

.merge-node {
  border-color: #607d8b;
}

.merge-node .node-header {
  background: #607d8b;
  color: white;
}

.database-node {
  border-color: #795548;
}

.database-node .node-header {
  background: #795548;
  color: white;
}

.email-node {
  border-color: #e91e63;
}

.email-node .node-header {
  background: #e91e63;
  color: white;
}
</style>
