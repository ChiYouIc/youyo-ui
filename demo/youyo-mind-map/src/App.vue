<template>
  <div id="app">
    <!-- 侧边栏 -->
    <div class="sidebar" :class="{ 'sidebar-collapsed': !sidebarVisible }">
      <div class="sidebar-header">
        <h3 class="sidebar-title">工具箱</h3>
        <button class="sidebar-close" @click="toggleSidebar">✕</button>
      </div>
      
      <div class="sidebar-content">
        <!-- 文件操作 -->
        <div class="menu-section">
          <h4 class="section-title">文件</h4>
          <div class="menu-items">
            <button class="menu-item" @click="handleExportData">
              <span class="menu-icon">💾</span>
              <span class="menu-text">导出数据</span>
            </button>
            <button class="menu-item" @click="handleTestImport">
              <span class="menu-icon">📁</span>
              <span class="menu-text">导入数据</span>
            </button>
            <button class="menu-item" @click="clearAll">
              <span class="menu-icon">🗑️</span>
              <span class="menu-text">清空画布</span>
            </button>
          </div>
        </div>

        <!-- 编辑操作 -->
        <div class="menu-section">
          <h4 class="section-title">编辑</h4>
          <div class="menu-items">
            <button class="menu-item" @click="addNode">
              <span class="menu-icon">➕</span>
              <span class="menu-text">添加节点</span>
            </button>
            <button class="menu-item" @click="layoutGraph('LR')">
              <span class="menu-icon">🔄</span>
              <span class="menu-text">重新布局</span>
            </button>
            <button class="menu-item" @click="centerView">
              <span class="menu-icon">🎯</span>
              <span class="menu-text">居中显示</span>
            </button>
          </div>
        </div>

        <!-- 视图操作 -->
        <div class="menu-section">
          <h4 class="section-title">视图</h4>
          <div class="menu-items">
            <button class="menu-item" @click="zoomIn">
              <span class="menu-icon">🔍</span>
              <span class="menu-text">放大</span>
            </button>
            <button class="menu-item" @click="zoomOut">
              <span class="menu-icon">🔎</span>
              <span class="menu-text">缩小</span>
            </button>
            <button class="menu-item" @click="fitView">
              <span class="menu-icon">📐</span>
              <span class="menu-text">适应窗口</span>
            </button>
          </div>
        </div>

        <!-- 主题设置 -->
        <div class="menu-section">
          <h4 class="section-title">主题</h4>
          <div class="menu-items">
            <button class="menu-item" @click="toggleTheme">
              <span class="menu-icon">🎨</span>
              <span class="menu-text">切换主题</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 遮罩层 -->
    <div v-if="sidebarVisible && isMobile" class="sidebar-overlay" @click="toggleSidebar"></div>

    <!-- 顶部工具栏 -->
    <div class="top-toolbar">
      <div class="toolbar-left">
        <div class="menu-icon" @click="toggleSidebar">≡</div>
        <span class="app-title">Mind Map</span>
      </div>
      <div class="toolbar-right">
        <button class="export-btn" @click="handleExportData">导出数据</button>
        <button class="import-btn" @click="handleTestImport">测试导入</button>
        <button class="share-btn">Share</button>
        <div class="tool-icons">
          <div class="tool-icon">📋</div>
          <div class="tool-icon">📝</div>
          <div class="tool-icon">👁</div>
          <div class="tool-icon">⚙</div>
        </div>
      </div>
    </div>

    <!-- 主画布区域 -->
    <div class="canvas-container" :class="{ 'canvas-with-sidebar': sidebarVisible }">
      <VueFlow
        ref="vueFlowRef"
        :nodes="nodes"
        :edges="edges"
        fit-view
        :min-zoom="0.1"
        :max-zoom="2"
        :default-edge-options="{ type: 'smoothstep' }"
        :pan-on-drag="[2]"
        :zoom-on-scroll="true"
        :zoom-on-pinch="true"
        :zoom-on-double-click="true"
        :default-viewport="{ zoom: 1 }"
        :nodes-draggable="true"
        :nodes-connectable="false"
        @nodes-initialized="layoutGraph('LR')"
        @viewport-change="onViewportChange"
        @node-drag-stop="onNodeDragStop"
        @nodes-change="onNodesChange"
      >
        <!-- 背景 -->
        <Background :size="1" pattern="dots" />

        <!-- 控制器 -->
        <Controls :show-fit-view="true" :show-zoom="true" />

        <!-- 小地图 -->
        <MiniMap :zoom-on-click="true" :zoom-on-scroll="true" :pan-on-click="true" :show-nodes="true" :show-edges="true" node-color="#1a1d4b" mask-color="rgba(255, 255, 255, 0.7)" />
        <template #node-central="{ data }">
          <div class="central-node">
            <!-- 左侧连接点 -->
            <!-- <Handle type="target" :position="Position.Left" class="node-handle left-handle" /> -->
            <!-- 右侧连接点 -->
            <Handle type="source" :position="Position.Right" class="node-handle right-handle" />

            <div class="node-icon">{{ data.childCount || 0 }}</div>
            <span class="node-text">{{ data.label }} ({{ data.childCount || 0 }})</span>
          </div>
        </template>
        <template #node-note="{ data, id }">
          <ChildNode :data="data" :node-id="id" @add-child="handleAddChildNode" />
        </template>
      </VueFlow>
    </div>

    <!-- 底部工具栏 -->
    <div class="bottom-toolbar">
      <div class="toolbar-section">
        <div class="zoom-info">Mind Map</div>
        <div class="zoom-controls">
          <button @click="zoomOut">-</button>
          <span class="zoom-level">{{ zoomLevel }}%</span>
          <button @click="zoomIn">+</button>
        </div>
      </div>
      <div class="toolbar-section center-tools">
        <div class="tool-group">
          <button class="tool-btn" @click="addNode">➕</button>
          <button class="tool-btn">↶</button>
          <button class="tool-btn">↷</button>
          <button class="tool-btn">📋</button>
          <button class="tool-btn">🗑</button>
          <button class="tool-btn">📎</button>
          <button class="tool-btn">🔗</button>
          <button class="tool-btn">📝</button>
          <button class="tool-btn">🎨</button>
          <button class="tool-btn">✨</button>
        </div>
      </div>
      <div class="toolbar-section"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, computed, onMounted, onUnmounted } from 'vue';
import { Handle, Position, VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import ChildNode from './components/ChildNode.vue';
import { useLayout } from './hooks/useLayout';
import { useCanvasData } from './hooks/useCanvasData';
import { useNodes } from './hooks/useNodes';
import { useZoom } from './hooks/useZoom';

// Vue Flow 样式
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import '@vue-flow/minimap/dist/style.css';

// 使用 hooks
const { nodes, edges, addNode, addChildNode, updateNodesAndEdges, initializeNodes, clearAll, updateNodePosition, checkNodeSwap } = useNodes();
const { currentZoom, zoomLevel, zoomIn, zoomOut, centerView, onViewportChange, setCurrentZoom } = useZoom();
const { layout } = useLayout();
const { exportCanvasData, testImportData } = useCanvasData();

// Vue Flow 引用
const vueFlowRef = ref();

// 侧边栏状态
const sidebarVisible = ref(false);
const windowWidth = ref(window.innerWidth);

// 计算属性
const isMobile = computed(() => windowWidth.value < 768);

// 监听窗口大小变化
function handleResize() {
  windowWidth.value = window.innerWidth;
  // 移动端自动收起侧边栏
  if (isMobile.value && sidebarVisible.value) {
    sidebarVisible.value = false;
  }
}

// 生命周期
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

// 切换侧边栏
function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value;
}

// 切换主题
function toggleTheme() {
  // 这里可以实现主题切换逻辑
  console.log('切换主题');
}

// 适应窗口
function fitView() {
  if (vueFlowRef.value) {
    vueFlowRef.value.fitView({ padding: 0.1 });
  }
}

// 处理导出数据
function handleExportData() {
  exportCanvasData(nodes.value, edges.value, currentZoom.value);
}

// 处理测试导入
function handleTestImport() {
  const result = testImportData();
  if (result.success && result.nodes && result.edges) {
    // 更新节点和边数据
    updateNodesAndEdges(result.nodes, result.edges);

    // 如果有缩放信息，恢复缩放级别
    if (result.metadata?.currentZoom) {
      setCurrentZoom(result.metadata.currentZoom);
    }
  }
}

// 处理从子节点添加新节点
function handleAddChildNode(parentNodeId: string) {
  const newNodeId = addChildNode(parentNodeId);
  console.log(`从节点 ${parentNodeId} 添加了新子节点 ${newNodeId}`);
}

// 布局图表
async function layoutGraph(direction: string) {
  const layoutResult = layout(nodes.value, edges.value, direction);
  updateNodesAndEdges(layoutResult, edges.value);

  nextTick(() => {
    centerView();
  });
}

// 初始化节点，添加延迟居中
function initNodes() {
  initializeNodes();
  setTimeout(() => {
    centerView();
  }, 200);
}

// 处理节点拖拽停止事件
function onNodeDragStop(event: any) {
  const draggedNode = event.node;
  // 检查是否需要交换节点位置
  const swapped = checkNodeSwap(draggedNode, nodes.value);
  
  if (swapped) {
    console.log(`节点 ${draggedNode.id} 与其他节点交换了位置`);
  }
}

// 处理节点变化事件
function onNodesChange(changes: any) {
  // 这里可以处理节点位置变化等其他事件
  changes.forEach((change: any) => {
    if (change.type === 'position' && change.position) {
      updateNodePosition(change.id, change.position);
    }
  });
}

// 页面加载后初始化
setTimeout(initNodes, 100);
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 顶部工具栏 */
.top-toolbar {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 100;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.menu-icon {
  font-size: 20px;
  color: #666;
  cursor: pointer;
}

.app-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.export-btn {
  background: #52c41a;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 12px;
}

.export-btn:hover {
  background: #389e0d;
}

.import-btn {
  background: #1890ff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 12px;
}

.import-btn:hover {
  background: #096dd9;
}

.share-btn {
  background: #ffd666;
  color: #333;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.share-btn:hover {
  background: #ffcd33;
}

.tool-icons {
  display: flex;
  gap: 12px;
}

.tool-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.tool-icon:hover {
  background: #f1f3f4;
}

/* 侧边栏样式 */
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #e1e5e9;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  z-index: 200;
  transform: translateX(0);
  transition: transform 0.3s ease;
  overflow-y: auto;
}

.sidebar-collapsed {
  transform: translateX(-100%);
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e1e5e9;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.sidebar-close {
  background: none;
  border: none;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
}

.sidebar-close:hover {
  background: #f1f3f4;
}

.sidebar-content {
  padding: 16px 0;
}

.menu-section {
  margin-bottom: 24px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin: 0 0 12px 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 14px;
  color: #333;
}

.menu-item:hover {
  background: #f8f9fa;
}

.menu-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.menu-text {
  flex: 1;
}

/* 遮罩层 */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 150;
}

/* 主画布 */
.canvas-container {
  flex: 1;
  position: relative;
  background: #fff;
  overflow: auto;
  transition: margin-left 0.3s ease;
}

.canvas-with-sidebar {
  margin-left: 280px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .canvas-with-sidebar {
    margin-left: 0;
  }
  
  .sidebar {
    width: 320px;
  }
}

/* 中心节点 */
.central-node {
  background: #1a1d4b;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: auto;
  max-width: 200px;
  white-space: nowrap;
}

.node-icon {
  width: 20px;
  height: 20px;
  background: #4ade80;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
}

.node-text {
  font-size: 14px;
  font-weight: 500;
}

/* 子节点样式 - 移除，已在组件中定义 */

/* 底部工具栏 */
.bottom-toolbar {
  height: 60px;
  background: #fff;
  border-top: 1px solid #e1e5e9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 100;
}

.toolbar-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.zoom-info {
  font-size: 14px;
  color: #666;
}

.zoom-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.zoom-controls button {
  width: 28px;
  height: 28px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s;
}

.zoom-controls button:hover {
  background: #f1f3f4;
}

.zoom-level {
  font-size: 14px;
  color: #333;
  min-width: 40px;
  text-align: center;
}

.center-tools {
  flex: 1;
  justify-content: center;
}

.tool-group {
  display: flex;
  gap: 8px;
  background: #f8f9fa;
  padding: 4px;
  border-radius: 8px;
}

.tool-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: all 0.2s;
}

.tool-btn:hover {
  background: #e1e5e9;
}

:deep(.vue-flow__edge-path) {
  stroke: #94a3b8;
  stroke-width: 2;
}

:deep(.vue-flow__edge.selected .vue-flow__edge-path) {
  stroke: #3b82f6;
}

:deep(.vue-flow__controls) {
  bottom: 80px;
  right: 20px;
}

:deep(.vue-flow__minimap) {
  bottom: 80px;
  left: 20px;
  width: 200px;
  height: 150px;
  border-radius: 8px;
  border: 1px solid #e1e5e9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(.vue-flow__background) {
  background-color: #fff;
}

/* 连接点样式 */
:deep(.node-handle) {
  width: 8px;
  height: 8px;
  background: #1890ff;
  border: 2px solid #fff;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.2s ease;
}

:deep(.vue-flow__node:hover .node-handle) {
  opacity: 1;
}

:deep(.node-handle:hover) {
  background: #40a9ff;
  transform: scale(1.3);
}

:deep(.left-handle) {
  left: -6px;
}

:deep(.right-handle) {
  right: -6px;
}

/* 拖拽相关样式 */
:deep(.vue-flow__node) {
  cursor: grab;
  transition: all 0.2s ease;
}

:deep(.vue-flow__node:active) {
  cursor: grabbing;
}

:deep(.vue-flow__node.dragging) {
  opacity: 0.8;
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

/* 中心节点特殊样式 */
:deep(.vue-flow__node[data-id='central']) {
  cursor: default;
}

:deep(.vue-flow__node[data-id='central']:active) {
  cursor: default;
}

/* 拖拽时的视觉提示 */
:deep(.vue-flow__node.vue-flow__node--dragging) {
  opacity: 0.7;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}
</style>
