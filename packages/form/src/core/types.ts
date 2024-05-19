import { VNode } from 'vue';

/**
 * 组件的配置类型
 */
export type ComponentConfigType = {
  /** 默认值 */
  defaultValue: any;
  /** 字段标签 */
  label: string;
  /** 字段名称 */
  name: string;
  /** 组件类型 */
  component: ComponentModeType;
  /** 是否必填 */
  required: boolean;
  /** 是否禁用 */
  disabled: boolean;
};

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
 * 组件初始化 option
 */
export type AbstractComponentInitOption<Value> = {
  value: Value;
};

/**
 * 抽象组件构造方法option
 */
export type ComponentConstructorOptionType = Record<string, any> & {
  id: string;
  name: string;
  component: ComponentModeType;
  label: string;
  required: boolean;
  disabled: boolean;
};

export enum ComponentMode {
  Empty,
  Input,
  DatePicker,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  Table,
  TimePicker,
  Upload,
  Fence,
}

export type ComponentModeType = keyof typeof ComponentMode;
