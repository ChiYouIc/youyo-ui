import { computed, ref } from 'vue';
import type { Edge, Node } from '@vue-flow/core';
import type { NodeData } from '../types';

export function useNodes() {
  // 定义颜色数组
  const colors = [
    '#4285f4', // 蓝色
    '#34a853', // 绿色
    '#fbbc04', // 黄色
    '#ea4335', // 红色
    '#ff6d01', // 橙色
    '#9c27b0', // 紫色
    '#00bcd4', // 青色
    '#ff5722', // 深橙色
  ];

  // 响应式状态
  const nodes = ref<Node<NodeData>[]>([
    {
      id: 'central',
      type: 'central',
      position: { x: 400, y: 300 },
      data: { label: 'Central Topic', childCount: 0, color: '#1a1d4b' },
      draggable: false,
    },
  ]);

  const edges = ref<Edge[]>([]);
  let nodeId = 1;

  // 计算属性
  const nodeCount = computed(() => nodes.value.length);
  const edgeCount = computed(() => edges.value.length);

  // 更新所有节点的子节点数量
  function updateAllChildCounts() {
    // 先将所有节点的子节点数量重置为0
    nodes.value.forEach(node => {
      node.data.childCount = 0;
    });

    // 遍历所有边，统计每个节点的子节点数量
    edges.value.forEach(edge => {
      const parentNode = nodes.value.find(node => node.id === edge.source);
      if (parentNode) {
        parentNode.data.childCount = (parentNode.data.childCount || 0) + 1;
      }
    });
  }

  // 添加节点
  function addNode() {
    const newId = `node-${nodeId++}`;
    const angle = (nodeId - 2) * ((Math.PI * 2) / 6); // 6个方向分布
    const radius = 180;
    const x = 400 + Math.cos(angle) * radius;
    const y = 300 + Math.sin(angle) * radius;

    nodes.value.push({
      id: newId,
      type: 'note',
      position: { x, y },
      data: { label: `分支${nodeId - 1}`, childCount: 0, color: colors[nodeId % colors.length] },
      // draggable: true,
    });

    edges.value.push({
      id: `e-central-${newId}`,
      source: 'central',
      target: newId,
      type: 'smoothstep',
    });

    // 更新所有节点的子节点数量
    updateAllChildCounts();
  }

  // 更新节点和边数据
  function updateNodesAndEdges(newNodes: Node<NodeData>[], newEdges: Edge[]) {
    nodes.value = newNodes;
    edges.value = newEdges;

    // 更新节点计数器（确保新增节点不会重复ID）
    const maxNodeId = Math.max(...newNodes.filter(node => node.id.startsWith('node-')).map(node => parseInt(node.id.replace('node-', '')) || 0), 0);
    nodeId = maxNodeId + 1;

    // 更新所有节点的子节点数量
    updateAllChildCounts();
  }

  // 初始化一些节点
  function initializeNodes() {
    for (let i = 0; i < 4; i++) {
      addNode();
    }
  }

  // 清空所有节点和边
  function clearAll() {
    nodes.value = [
      {
        id: 'central',
        type: 'central',
        position: { x: 400, y: 300 },
        data: { label: 'Central Topic', childCount: 0, color: '#1a1d4b' },
        draggable: false,
      },
    ];
    edges.value = [];
    nodeId = 1;
  }

  // 从指定父节点添加子节点
  function addChildNode(parentNodeId: string) {
    const newId = `node-${nodeId++}`;

    // 获取父节点信息
    const parentNode = nodes.value.find(node => node.id === parentNodeId);
    if (!parentNode) return;

    // 计算新节点位置 - 在父节点右侧
    const newPosition = {
      x: parentNode.position.x + 200, // 右侧200px
      y: parentNode.position.y + Math.random() * 60 - 30, // 随机Y偏移，避免重叠
    };

    // 添加新节点
    nodes.value.push({
      id: newId,
      type: 'note',
      position: newPosition,
      data: { label: `新节点${nodeId - 1}`, childCount: 0, color: colors[nodeId % colors.length] },
      // draggable: true,
    });

    // 添加连接边
    edges.value.push({
      id: `e-${parentNodeId}-${newId}`,
      source: parentNodeId,
      target: newId,
      type: 'smoothstep',
    });

    // 更新所有节点的子节点数量
    updateAllChildCounts();

    return newId;
  }

  // 删除指定节点
  function removeNode(nodeIdToRemove: string) {
    if (nodeIdToRemove === 'central') return; // 不允许删除中心节点

    // 删除节点
    nodes.value = nodes.value.filter(node => node.id !== nodeIdToRemove);

    // 删除相关的边
    edges.value = edges.value.filter(edge => edge.source !== nodeIdToRemove && edge.target !== nodeIdToRemove);

    // 更新所有节点的子节点数量
    updateAllChildCounts();
  }

  // 更新节点位置
  function updateNodePosition(nodeId: string, position: { x: number; y: number }) {
    const node = nodes.value.find(n => n.id === nodeId);
    if (node) {
      node.position = position;
    }
  }

  // 检测节点交换
  function checkNodeSwap(draggedNode: Node<NodeData>, allNodes: Node<NodeData>[]) {
    const threshold = 50; // 交换阈值距离
    
    for (const node of allNodes) {
      if (node.id === draggedNode.id) continue;
      
      const distance = Math.sqrt(
        Math.pow(draggedNode.position.x - node.position.x, 2) + 
        Math.pow(draggedNode.position.y - node.position.y, 2)
      );
      
      if (distance < threshold) {
        // 交换位置
        const tempPosition = { ...draggedNode.position };
        draggedNode.position = { ...node.position };
        node.position = tempPosition;
        
        return true;
      }
    }
    
    return false;
  }

  return {
    // 状态
    nodes,
    edges,
    nodeCount,
    edgeCount,

    // 方法
    addNode,
    addChildNode,
    updateNodesAndEdges,
    initializeNodes,
    clearAll,
    removeNode,
    updateAllChildCounts,
    updateNodePosition,
    checkNodeSwap,
  };
}
