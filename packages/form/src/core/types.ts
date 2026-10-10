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

  /** 校验，通过时返回 undefined，否则返回错误信息 */
  validate(): string | undefined;
}

/**
 * 组件的结构化描述。
 * 组件实体是类（带私有字段，与 UnwrapRef 映射出的类型无法互认），
 * 对外的 props / inject 统一使用它，使用方用 ref()/reactive() 包过的实例才能通过类型检查。
 */
export interface ComponentModel extends ComponentActionType {
  /** 组件的id */
  id: string;
  /** 字段标签 */
  label: string;
  /** 字段名称 */
  name: string;
  /** 默认值 */
  defaultValue: any;
  /** 组件类型 */
  component: string;
  /** 是否必填 */
  required: boolean;
  /** 是否禁用 */
  disabled: boolean;
  /** 获取组件的值 */
  getVal(): any;
}

/**
 * 栅栏组件的结构化描述
 */
export interface FenceModel extends ComponentModel {
  /** 行 */
  readonly row: number;
  /** 列 */
  readonly col: number;
  /** 单元格，按行优先排列 */
  readonly list: Array<Array<ComponentModel>>;
  /** 移除单元格内的组件 */
  remove(component: ComponentModel): boolean;
}

/**
 * 套件组件的结构化描述
 */
export interface SuiteModel extends ComponentModel {
  /** 套件类型标识 */
  readonly suiteType: string;
  /** 内部字段，清单与校验规则由套件代码固定 */
  readonly fields: Array<ComponentModel>;
}

/**
 * 表单校验错误
 */
export interface FormValidateError {
  /** 字段名称 */
  name: string;
  /** 错误信息 */
  message: string;
}

/**
 * 表单校验结果
 */
export interface FormValidateResult {
  /** 是否校验通过 */
  valid: boolean;
  /** 错误列表 */
  errors: FormValidateError[];
}

/**
 * 表单的结构化描述
 */
export interface FormModel {
  /** 表单id */
  readonly id: string;
  /** 表单名称 */
  name: string;
  /** 表单描述 */
  description: string;
  /** 表单版本 */
  version: string;
  /** 标签宽度 */
  labelWidth: string;
  /** 宽 */
  width: string;
  /** 高 */
  height: string;
  /** 组件上下间距，单位 px */
  verticalSpacing?: number;
  /** 组件左右间距，单位 px */
  horizontalSpacing?: number;
  /** 标签与组件的排列方式 */
  labelLayout?: 'horizontal' | 'vertical';
  /** 组件列表 */
  readonly components: Array<ComponentModel>;
  /** 清空组件 */
  clear(): void;
  /** 移除组件 */
  remove(component: ComponentModel): boolean;
  /** 输出表单值 */
  formValue(): Record<string, any>;
  /** 输出表单配置 json */
  toJson(): Record<string, any>;
  /** 校验表单 */
  validate(): FormValidateResult;
}

/**
 * 判断是否是栅栏组件
 */
export function isFenceModel(component: ComponentModel): component is FenceModel {
  return component.component === 'Fence';
}

/**
 * 判断是否是套件组件
 */
export function isSuiteModel(component: ComponentModel): component is SuiteModel {
  return component.component === 'Suite';
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

/**
 * 上传组件的值
 */
export type UploadValue = Array<Record<string, any>>;
