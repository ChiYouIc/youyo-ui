// 定义节点数据类型
export interface NodeData {
  label: string;
  childCount?: number;
  color?: string;
}

// 定义视口类型
export interface ViewportData {
  x: number;
  y: number;
  zoom: number;
}
