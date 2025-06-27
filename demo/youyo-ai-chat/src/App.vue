<template>
  <div id="app">
    <!-- 左侧菜单栏 -->
    <Sidebar @item-selected="handleItemSelected" @toggle-changed="handleSidebarToggle" />

    <!-- 主内容区域 -->
    <div class="main-content" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
      <div class="flow-container">
        <VueFlow
          v-model:nodes="nodes"
          v-model:edges="edges"
          :default-viewport="{ zoom: 0.6, x: 50, y: 50 }"
          :min-zoom="0.2"
          :max-zoom="1.5"
          :node-types="nodeTypes"
          class="vue-flow-container"
          @nodes-initialized="onNodesInitialized"
        >
          <!-- 背景 -->
          <Background pattern-color="#aaa" :gap="16" />

          <!-- 控制器 -->
          <Controls />

          <!-- 小地图 -->
          <MiniMap />

          <!-- 面板 -->
          <Panel position="top-left" class="panel">
            <h3>AI 聊天流程图</h3>
            <div class="panel-actions">
              <button @click="addNode" class="btn">添加节点</button>
              <button @click="resetFlow" class="btn">重置</button>
            </div>
          </Panel>

          <Panel position="top-right" class="panel">
            <div class="info">
              <p>节点数量: {{ nodes.length }}</p>
              <p>连接数量: {{ edges.length }}</p>
            </div>
          </Panel>
        </VueFlow>
      </div>

      <!-- 底部聊天输入框 -->
      <ChatInput @mode-changed="handleModeChanged" @message-sent="handleMessageSent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, provide } from 'vue';
import { VueFlow, Panel, useVueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';
import type { Node, Edge } from '@vue-flow/core';
import ChatInput from './components/ChatInput.vue';
import Sidebar from './components/Sidebar.vue';
import UserMessageNode from './components/UserMessageNode.vue';
import LLMMessageNode from './components/LLMMessageNode.vue';
import RootNode from './components/RootNode.vue';

// 导入样式
import '@vue-flow/core/dist/style.css';
import '@vue-flow/core/dist/theme-default.css';
import '@vue-flow/controls/dist/style.css';
import '@vue-flow/minimap/dist/style.css';
import { useLayout } from './hooks/useLayout';

const { layout } = useLayout();
const { fitView } = useVueFlow();

// 侧边栏状态
const sidebarCollapsed = ref(false);

// 自定义节点类型配置
const nodeTypes = {
  root: RootNode,
  userMessage: UserMessageNode,
  llmMessage: LLMMessageNode,
} as any;

// 初始节点数据
const initialNodes: Node[] = [
  {
    id: 'root',
    type: 'root',
    position: { x: 300, y: 50 },
    data: {
      title: '对话开始',
      subtitle: 'AI 聊天流程',
      description: '这是一个智能对话系统，支持多种AI模型进行自然语言交互。',
    },
  },
  {
    id: 'user-1',
    type: 'userMessage',
    position: { x: 300, y: 250 },
    data: {
      message: '你好，我想了解一下如何使用Vue Flow创建自定义节点？',
      timestamp: new Date('2024-01-10T10:30:00'),
    },
  },
  {
    id: 'llm-1',
    type: 'llmMessage',
    position: { x: 300, y: 450 },
    data: {
      message:
        '很高兴为您介绍Vue Flow自定义节点的创建方法！\n\n创建自定义节点主要需要以下几个步骤：\n1. 创建Vue组件\n2. 导入Handle和Position\n3. 定义节点样式\n4. 注册到nodeTypes中\n\n这样就可以在流程图中使用您的自定义节点了。',
      modelName: 'GPT-4',
      timestamp: new Date('2024-01-10T10:30:15'),
    },
  },
  {
    id: 'user-2',
    type: 'userMessage',
    position: { x: 300, y: 750 },
    data: {
      message: '太好了！那如何设置节点的宽度和高度呢？',
      timestamp: new Date('2024-01-10T10:31:00'),
    },
  },
  {
    id: 'llm-2',
    type: 'llmMessage',
    position: { x: 300, y: 950 },
    data: {
      message:
        '关于节点尺寸的设置：\n\n• 宽度：可以使用min-width和max-width来控制范围\n• 高度：通常设置min-height，让内容自动撑开\n• 响应式：内容较多时节点会自动调整大小\n\n例如：min-width: 300px; max-width: 500px; 这样节点宽度就会在300-500px之间根据内容调整。',
      modelName: 'DeepSeek V3',
      timestamp: new Date('2024-01-10T10:31:20'),
    },
  },
];

// 初始边数据
const initialEdges: Edge[] = [
  {
    id: 'e0',
    source: 'root',
    target: 'user-1',
    animated: true,
    style: { stroke: '#ff6b6b', strokeWidth: 3 },
    type: 'smoothstep',
  },
  {
    id: 'e1',
    source: 'user-1',
    target: 'llm-1',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 3 },
    type: 'smoothstep',
  },
  {
    id: 'e2',
    source: 'root',
    target: 'user-2',
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 3 },
    type: 'smoothstep',
  },
  {
    id: 'e3',
    source: 'user-2',
    target: 'llm-2',
    animated: true,
    style: { stroke: '#6366f1', strokeWidth: 3 },
    type: 'smoothstep',
  },
];

// 响应式数据
const nodes = ref<Node[]>(initialNodes);
const edges = ref<Edge[]>(initialEdges);

// 添加新节点
const addNode = () => {
  const newId = (nodes.value.length + 1).toString();
  const newNode: Node = {
    id: newId,
    label: `新节点 ${newId}`,
    position: {
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
    },
    data: { label: `新添加的节点 ${newId}` },
    style: {
      background: '#f5f5f5',
      border: '2px solid #666',
      borderRadius: '8px',
      padding: '10px',
    },
  };
  nodes.value.push(newNode);
};

// 重置流程图
const resetFlow = () => {
  nodes.value = [...initialNodes];
  edges.value = [...initialEdges];
};

// 处理侧边栏菜单项选择
const handleItemSelected = (item: string) => {
  console.log('选择菜单项:', item);
  // 根据选择的菜单项执行相应操作
  switch (item) {
    case 'new-chat':
      // 新建聊天逻辑
      break;
    case 'history':
      // 查看历史记录逻辑
      break;
    case 'flow-design':
      // 流程设计逻辑（当前页面）
      break;
    default:
      break;
  }
};

// 处理侧边栏折叠切换
const handleSidebarToggle = (collapsed: boolean) => {
  sidebarCollapsed.value = collapsed;
  console.log('侧边栏状态:', collapsed ? '折叠' : '展开');
};

// 处理模式切换事件
const handleModeChanged = (mode: 'normal' | 'deepseek') => {
  console.log('模式已切换至:', mode);
  // 可以在这里添加模式切换的相关逻辑
};

// 处理消息发送事件
const handleMessageSent = (message: string, mode: 'normal' | 'deepseek') => {
  console.log(`[${mode}模式] 收到消息:`, message);
  // 这里可以添加实际的消息处理逻辑
  // 比如调用 API、更新聊天记录、添加新节点等
};

// 节点初始化完成后的处理
const onNodesInitialized = () => {
  // 应用布局
  nextTick(() => {
    setTimeout(() => {
      nodes.value = layout(nodes.value, edges.value, 'TB');

      // 再次延迟调用 fitView，确保布局完成
      setTimeout(() => {
        fitView({
          padding: 0.3, // 30% 的边距
          minZoom: 0.3, // 防止过小
          maxZoom: 0.9, // 防止过大
        });
      }, 150);
    }, 50);
  });
};

// 备用布局函数，可用于动态重新布局
const _layoutGraph = async (direction: string) => {
  nodes.value = layout(nodes.value, edges.value, direction);

  nextTick(() => {
    setTimeout(() => {
      fitView({
        padding: 0.2,
        minZoom: 0.3,
        maxZoom: 0.9,
      });
    }, 100);
  });
};

// 添加子节点的处理函数
const handleAddChild = (parentId: string) => {
  const parentNode = nodes.value.find(node => node.id === parentId);
  if (!parentNode) return;

  // 创建新的用户消息节点
  const newNodeId = `user-${Date.now()}`;
  const newNode: Node = {
    id: newNodeId,
    type: 'userMessage',
    position: {
      x: parentNode.position.x,
      y: parentNode.position.y + 200,
    },
    data: {
      message: '请输入您的问题...',
      timestamp: new Date(),
    },
  };

  // 添加新节点
  nodes.value.push(newNode);

  // 创建从父节点到新节点的边
  const newEdge: Edge = {
    id: `e-${parentId}-${newNodeId}`,
    source: parentId,
    target: newNodeId,
    animated: true,
    style: { stroke: '#10b981', strokeWidth: 3 },
    type: 'smoothstep',
  };

  // 添加新边
  edges.value.push(newEdge);

  // 重新布局
  nextTick(() => {
    setTimeout(() => {
      nodes.value = layout(nodes.value, edges.value, 'TB');
      setTimeout(() => {
        fitView({
          padding: 0.3,
          minZoom: 0.3,
          maxZoom: 0.9,
        });
      }, 150);
    }, 50);
  });
};

// 提供添加子节点的方法给子组件
provide('addChildNode', handleAddChild);

onMounted(() => {
  console.log('AI Chat Flow 已加载');
});
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.main-content {
  margin-left: 280px;
  transition: margin-left 0.3s ease;
  width: calc(100% - 280px);
  height: 100%;

  &.sidebar-collapsed {
    margin-left: 60px;
    width: calc(100% - 60px);
  }
}

.flow-container {
  width: 100%;
  height: 100%; /* 恢复全高度，不为输入框留空间 */
}

.vue-flow-container {
  width: 100%;
  height: 100%;
}

.panel {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;

  h3 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }

  .panel-actions {
    display: flex;
    gap: 8px;
    flex-direction: column;

    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      background: #1976d2;
      color: white;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s;

      &:hover {
        background: #1565c0;
      }

      &:active {
        background: #0d47a1;
      }
    }
  }

  .info {
    p {
      margin: 4px 0;
      font-size: 14px;
      color: #666;
    }
  }
}

// Vue Flow 样式定制
:deep(.vue-flow__node) {
  font-size: 14px;
  font-weight: 500;

  .vue-flow__node-default {
    border-radius: 8px;
  }
}

:deep(.vue-flow__edge) {
  .vue-flow__edge-path {
    stroke-width: 2;
  }
}

:deep(.vue-flow__controls) {
  button {
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 4px;

    &:hover {
      background: #f5f5f5;
    }
  }
}

:deep(.vue-flow__minimap) {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
</style>
