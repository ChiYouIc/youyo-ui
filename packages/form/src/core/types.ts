import { VNode } from 'vue';

/**
 * 组件类型
 */
export interface ComponentActionType {
  /** 组件的id */
  primaryId(): string;

  /** 初始化 */
  init(json: Record<string, any>): void;

  /** 输出 config json穿 */
  configToJson(): Record<string, any>;

  /** 获取组件的值 */
  valToJson(): Record<string, any>;

  /** 获取节点 */
  node(): VNode;
}

/**
 * 抽象组件构造方法option
 */
export type ComponentConstructorOptionType = Record<string, any> & {
  id: string;
  name: string;
  component: string;
  defaultValue: any;
  label: string;
  required: boolean;
  disabled: boolean;
};
