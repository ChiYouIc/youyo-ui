import { ref, computed } from 'vue'
import type { WorkflowNode, WorkflowEdge } from '../types/workflow'

/**
 * 纯状态管理（不依赖 useVueFlow，用于 App.vue 层面）
 */
export function useWorkflowState() {
  const workflowName = ref('Untitled Workflow')
  const selectedNodeId = ref<string | null>(null)
  const selectedEdgeId = ref<string | null>(null)

  // 这些将由 FlowCanvas 内部管理
  const nodes = ref<WorkflowNode[]>([])
  const edges = ref<WorkflowEdge[]>([])

  const selectedNode = computed(() => {
    if (!selectedNodeId.value) return null
    return nodes.value.find(n => n.id === selectedNodeId.value) || null
  })

  const nodeCount = computed(() => nodes.value.length)
  const edgeCount = computed(() => edges.value.length)

  function selectNode(nodeId: string) {
    selectedNodeId.value = nodeId
    selectedEdgeId.value = null
  }

  function selectEdge(edgeId: string) {
    selectedEdgeId.value = edgeId
    selectedNodeId.value = null
  }

  function clearSelection() {
    selectedNodeId.value = null
    selectedEdgeId.value = null
  }

  function removeNodeById(nodeId: string) {
    // 实际删除在 FlowCanvas 中处理
    nodes.value = nodes.value.filter(n => n.id !== nodeId)
    edges.value = edges.value.filter(e => e.source !== nodeId && e.target !== nodeId)
    if (selectedNodeId.value === nodeId) selectedNodeId.value = null
  }

  function handleConnect(connection: any) {
    // 实际连线在 FlowCanvas 中处理
  }

  function onNodesChange(_changes: any) {
    // 由 FlowCanvas 处理
  }

  function onEdgesChange(_changes: any) {
    // 由 FlowCanvas 处理
  }

  function addWorkflowNode(_type: any, _position: any, _overrides?: any) {
    // 由 FlowCanvas 处理
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return
      if (selectedNodeId.value) {
        removeNodeById(selectedNodeId.value)
      }
    }
  }

  return {
    workflowName,
    nodes,
    edges,
    selectedNodeId,
    selectedEdgeId,
    selectedNode,
    nodeCount,
    edgeCount,
    addWorkflowNode,
    removeNodeById,
    selectNode,
    selectEdge,
    clearSelection,
    handleConnect,
    handleKeydown,
    onNodesChange,
    onEdgesChange,
  }
}
