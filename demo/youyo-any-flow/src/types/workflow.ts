import type { Node, Edge } from '@vue-flow/core'

export enum NodeType {
  START = 'start',
  END = 'end',
  LLM = 'llm',
  HTTP = 'http',
  CODE = 'code',
  CONDITION = 'condition',
  LOOP = 'loop',
  KNOWLEDGE = 'knowledge',
  VARIABLE = 'variable',
}

export enum NodeCategory {
  BASIC = 'basic',
  AI = 'ai',
  LOGIC = 'logic',
  TOOL = 'tool',
}

export interface NodeCategoryMeta {
  key: NodeCategory
  label: string
  icon: string
  expanded: boolean
}

export interface NodeTypeMeta {
  type: NodeType
  label: string
  description: string
  icon: string
  color: string
  category: NodeCategory
  inputs: number
  outputs: number
}

export interface WorkflowNodeData {
  nodeType: NodeType
  label: string
  description: string
  color: string
  llmConfig?: LLMConfig
  httpConfig?: HttpConfig
  codeConfig?: CodeConfig
  conditionConfig?: ConditionConfig
  loopConfig?: LoopConfig
  knowledgeConfig?: KnowledgeConfig
  variableConfig?: VariableConfig
}

export interface LLMConfig {
  provider: string
  model: string
  temperature: number
  maxTokens: number
  systemPrompt: string
  userPrompt: string
}

export interface HttpConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  url: string
  headers: Record<string, string>
  body: string
  bodyType: 'json' | 'form' | 'raw'
}

export interface CodeConfig {
  language: 'javascript' | 'python'
  code: string
}

export interface ConditionConfig {
  variable: string
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'empty' | 'notEmpty'
  value: string
}

export interface LoopConfig {
  type: 'array' | 'count' | 'condition'
  arrayVariable: string
  maxIterations: number
}

export interface KnowledgeConfig {
  knowledgeBaseId: string
  query: string
  topK: number
  scoreThreshold: number
}

export interface VariableConfig {
  name: string
  type: 'string' | 'number' | 'boolean' | 'object' | 'array'
  defaultValue: string
}

export type WorkflowNode = Node<WorkflowNodeData>
export type WorkflowEdge = Edge

export interface WorkflowDefinition {
  id: string
  name: string
  description: string
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  createdAt: string
  updatedAt: string
}

export const NODE_TYPE_MAP: Record<NodeType, string> = {
  [NodeType.START]: 'start-node',
  [NodeType.END]: 'end-node',
  [NodeType.LLM]: 'llm-node',
  [NodeType.HTTP]: 'http-node',
  [NodeType.CODE]: 'code-node',
  [NodeType.CONDITION]: 'condition-node',
  [NodeType.LOOP]: 'loop-node',
  [NodeType.KNOWLEDGE]: 'knowledge-node',
  [NodeType.VARIABLE]: 'variable-node',
}

export const NODE_TYPE_META: NodeTypeMeta[] = [
  { type: NodeType.START, label: 'Start', description: 'Workflow entry point', icon: 'play', color: '#10B981', category: NodeCategory.BASIC, inputs: 0, outputs: 1 },
  { type: NodeType.END, label: 'End', description: 'Workflow exit point', icon: 'square', color: '#EF4444', category: NodeCategory.BASIC, inputs: 1, outputs: 0 },
  { type: NodeType.VARIABLE, label: 'Variable', description: 'Define workflow variables', icon: 'variable', color: '#6B7280', category: NodeCategory.BASIC, inputs: 0, outputs: 1 },
  { type: NodeType.LLM, label: 'LLM', description: 'Call large language model for text generation', icon: 'bot', color: '#8B5CF6', category: NodeCategory.AI, inputs: 1, outputs: 1 },
  { type: NodeType.KNOWLEDGE, label: 'Knowledge', description: 'Retrieve relevant content from knowledge base', icon: 'library', color: '#14B8A6', category: NodeCategory.AI, inputs: 1, outputs: 1 },
  { type: NodeType.CONDITION, label: 'Condition', description: 'Branch execution based on conditions', icon: 'git-branch', color: '#06B6D4', category: NodeCategory.LOGIC, inputs: 1, outputs: 2 },
  { type: NodeType.LOOP, label: 'Loop', description: 'Iterate over arrays or loop by condition', icon: 'repeat', color: '#EC4899', category: NodeCategory.LOGIC, inputs: 1, outputs: 2 },
  { type: NodeType.HTTP, label: 'HTTP Request', description: 'Send HTTP requests to external APIs', icon: 'globe', color: '#3B82F6', category: NodeCategory.TOOL, inputs: 1, outputs: 1 },
  { type: NodeType.CODE, label: 'Code', description: 'Execute JavaScript or Python code', icon: 'code', color: '#F59E0B', category: NodeCategory.TOOL, inputs: 1, outputs: 1 },
]

export const NODE_CATEGORY_META: NodeCategoryMeta[] = [
  { key: NodeCategory.BASIC, label: 'Basic', icon: 'layout-dashboard', expanded: true },
  { key: NodeCategory.AI, label: 'AI', icon: 'sparkles', expanded: true },
  { key: NodeCategory.LOGIC, label: 'Logic', icon: 'git-branch', expanded: true },
  { key: NodeCategory.TOOL, label: 'Tools', icon: 'wrench', expanded: true },
]
