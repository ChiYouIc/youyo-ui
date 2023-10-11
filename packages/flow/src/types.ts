export type NodeType = {
  title?: string;
  icon?: string;
  text?: string;
  type: NodeMode;
  groupList?: NodeType[];
  next?: NodeType;
};

/**
 * 节点类型
 */
export enum NodeMode {
  /** 开始节点 */
  START = 1,
  /** 结束节点 */
  END = 2,
  /** 普通节点 */
  NODE = 4,
  /** 条件节点 */
  CONDITION = 8,
  /** 组节点 */
  GROUP = 16,
}
