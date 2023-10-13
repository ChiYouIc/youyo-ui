import { NodeMode, NodeType } from './types';

function addNode() {}

function removeNode() {}

function isConditionNode(node: NodeType) {
  return node.type === NodeMode.CONDITION;
}

function isGroupNode(node: NodeType) {
  return node.type === NodeMode.GROUP;
}

function isEndNode(node: NodeType) {
  return node.type === NodeMode.END;
}

function isMode(n: NodeType, mode: NodeMode): boolean {
  const s = Number(n.type).toString(2).split('');
  for (let i = 0; i < s.length; i++) {
    if (mode === 1 << i) {
      return true;
    }
  }

  return false;
}

export { addNode, removeNode, isConditionNode, isGroupNode, isEndNode, isMode };
