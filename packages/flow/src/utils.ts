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

export { addNode, removeNode, isConditionNode, isGroupNode, isEndNode };
