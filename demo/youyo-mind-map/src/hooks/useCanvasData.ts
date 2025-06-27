import type { Edge, Node } from '@vue-flow/core';
import { useVueFlow } from '@vue-flow/core';
import type { NodeData } from '../types';

export function useCanvasData() {
  const { fitView } = useVueFlow();

  // 导出画布数据
  function exportCanvasData(nodes: Node<NodeData>[], edges: Edge[], currentZoom: number) {
    const canvasData = {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data,
        // 如果有其他属性也可以添加
        sourcePosition: node.sourcePosition,
        targetPosition: node.targetPosition,
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type,
        // 如果有其他属性也可以添加
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
      })),
      metadata: {
        exportTime: new Date().toISOString(),
        nodeCount: nodes.length,
        edgeCount: edges.length,
        currentZoom: currentZoom,
      },
    };

    console.log('=== 画布数据导出 ===');
    console.log('导出时间:', canvasData.metadata.exportTime);
    console.log('节点数量:', canvasData.metadata.nodeCount);
    console.log('边数量:', canvasData.metadata.edgeCount);
    console.log('当前缩放:', canvasData.metadata.currentZoom + '%');
    console.log('\n=== 节点数据 ===');
    console.table(canvasData.nodes);
    console.log('\n=== 边数据 ===');
    console.table(canvasData.edges);
    console.log('\n=== 完整数据结构 ===');
    console.log(JSON.stringify(canvasData, null, 2));

    return canvasData;
  }

  // 导入画布数据并渲染
  function importCanvasData(canvasDataJson: string | object) {
    try {
      // 如果传入的是字符串，先解析为对象
      const canvasData = typeof canvasDataJson === 'string' ? JSON.parse(canvasDataJson) : canvasDataJson;

      // 验证数据格式
      if (!canvasData.nodes || !canvasData.edges) {
        throw new Error('数据格式不正确，缺少 nodes 或 edges 字段');
      }

      // 转换节点数据
      const importedNodes: Node<NodeData>[] = canvasData.nodes.map((nodeData: any) => ({
        id: nodeData.id,
        type: nodeData.type || 'default',
        position: {
          x: nodeData.position?.x || 0,
          y: nodeData.position?.y || 0,
        },
        data: {
          label: nodeData.data?.label || '未命名节点',
          ...nodeData.data,
        },
        // 可选属性
        ...(nodeData.sourcePosition && { sourcePosition: nodeData.sourcePosition }),
        ...(nodeData.targetPosition && { targetPosition: nodeData.targetPosition }),
        // vue-flow 需要的其他属性
        draggable: false,
      }));

      // 转换边数据
      const importedEdges: Edge[] = canvasData.edges.map((edgeData: any) => ({
        id: edgeData.id,
        source: edgeData.source,
        target: edgeData.target,
        type: edgeData.type || 'smoothstep',
        // 可选属性
        ...(edgeData.sourceHandle && { sourceHandle: edgeData.sourceHandle }),
        ...(edgeData.targetHandle && { targetHandle: edgeData.targetHandle }),
      }));

      // 自动调整视图以适应导入的内容
      setTimeout(() => {
        if (fitView) {
          fitView({ duration: 800, padding: 0.1 });
        }
      }, 100);

      console.log('=== 数据导入成功 ===');
      console.log('导入节点数量:', importedNodes.length);
      console.log('导入边数量:', importedEdges.length);
      console.log('原始导出时间:', canvasData.metadata?.exportTime || '未知');

      return {
        success: true,
        nodes: importedNodes,
        edges: importedEdges,
        metadata: canvasData.metadata,
      };
    } catch (error) {
      console.error('=== 数据导入失败 ===');
      console.error('错误信息:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '未知错误',
      };
    }
  }

  // 测试导入功能
  function testImportData() {
    // 示例数据 - 可以用实际从数据库获取的数据替换
    const testData = {
      nodes: [
        {
          id: 'central',
          type: 'central',
          position: { x: 400, y: 300 },
          data: { label: '测试中心节点' },
        },
        {
          id: 'node-1',
          type: 'default',
          position: { x: 200, y: 200 },
          data: { label: '测试分支1' },
        },
        {
          id: 'node-2',
          type: 'default',
          position: { x: 600, y: 200 },
          data: { label: '测试分支2' },
        },
      ],
      edges: [
        {
          id: 'e-central-node-1',
          source: 'central',
          target: 'node-1',
          type: 'smoothstep',
        },
        {
          id: 'e-central-node-2',
          source: 'central',
          target: 'node-2',
          type: 'smoothstep',
        },
      ],
      metadata: {
        exportTime: new Date().toISOString(),
        nodeCount: 3,
        edgeCount: 2,
        currentZoom: 100,
      },
    };

    console.log('=== 开始测试数据导入 ===');
    const result = importCanvasData(testData);

    if (result.success) {
      console.log('✅ 测试导入成功！');
    } else {
      console.log('❌ 测试导入失败:', result.error);
    }

    return result;
  }

  return {
    exportCanvasData,
    importCanvasData,
    testImportData,
  };
}
