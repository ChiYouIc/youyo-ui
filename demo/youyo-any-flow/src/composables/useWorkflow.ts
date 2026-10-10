import { ref, computed } from 'vue'
import { useVueFlow, type Connection } from '@vue-flow/core'
import type { WorkflowNode, WorkflowEdge, WorkflowNodeData } from '../types/workflow'
import { NodeType, NODE_TYPE_META, NODE_TYPE_MAP } from '../types/workflow'

let nodeIdCounter = 0
function generateNodeId(): string {
  return `node_${Date.now()}_${++nodeIdCounter}`
}

function generateEdgeId(): string {
  return `edge_${Date.now()}_${++nodeIdCounter}`
}

export function useWorkflow() {
  const workflowName = ref('Untitled Workflow')
  const selectedNodeId = ref<string | null>(null)
  const selectedEdgeId = ref<string | null>(null)

  const { nodes, edges, addNodes, addEdges, onNodesChange, onEdgesChange, findNode, removeNodes, removeEdges, updateNodeData } = useVueFlow<
    WorkflowNode,
    WorkflowEdge
  >()

  function addWorkflowNode(nodeType: NodeType, position: { x: number; y: number }, overrides?: Partial<WorkflowNodeData>) {
    const meta = NODE_TYPE_META.find((m) => m.type === nodeType)
    const label = meta?.label || 'Unknown'
    const color = meta?.color || '#94A3B8'
    const newNode: WorkflowNode = {
      id: generateNodeId(),
      type: NODE_TYPE_MAP[nodeType],
      position,
      data: {
        nodeType,
        label,
        description: '',
        ...overrides,
      },
      style: {
        '--node-color': color,
      } as Record<string, string>,
    }
    addNodes([newNode])
    selectedNodeId.value = newNode.id
    return newNode
  }

  function removeNodeById(nodeId: string) {
    removeNodes([nodeId])
    if (selectedNodeId.value === nodeId) {
      selectedNodeId.value = null
    }
  }

  function deleteSelectedNode() {
    if (selectedNodeId.value) {
      removeNodes([selectedNodeId.value])
      selectedNodeId.value = null
    }
  }

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

  function handleConnect(connection: Connection) {
    const newEdge: WorkflowEdge = {
      ...connection,
      id: generateEdgeId(),
      type: 'default',
      animated: true,
      style: { stroke: '#94A3B8', strokeWidth: 2 },
    }
    addEdges([newEdge])
  }

  function deleteSelectedEdge() {
    if (selectedEdgeId.value) {
      removeEdges([selectedEdgeId.value])
      selectedEdgeId.value = null
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return
      }
      if (selectedNodeId.value) {
        deleteSelectedNode()
      } else if (selectedEdgeId.value) {
        deleteSelectedEdge()
      }
    }
  }

  const selectedNode = computed(() => {
    if (!selectedNodeId.value) return null
    return findNode(selectedNodeId.value) as WorkflowNode | undefined
  })

  const nodeCount = computed(() => nodes.value.length)
  const edgeCount = computed(() => edges.value.length)

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
    deleteSelectedNode,
    selectNode,
    selectEdge,
    clearSelection,
    handleConnect,
    deleteSelectedEdge,
    handleKeydown,
    onNodesChange,
    onEdgesChange,
    updateNodeData,
  }
}
