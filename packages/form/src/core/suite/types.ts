import { ComponentModel } from '../types';

/**
 * 套件内部字段定义。
 * 字段清单由套件代码写死，设计器不可增删或替换。
 */
export interface SuiteFieldDefinition {
  /** 内部字段名，输出时会加上套件实例名前缀 */
  name: string;
  /** 内部字段标签 */
  label: string;
  /** 复用已有的组件类型 */
  component: string;
  /** 默认值 */
  defaultValue?: any;
  /** 是否必填 */
  required?: boolean;
  /** 传给内部组件 init 的额外配置 */
  config?: Record<string, any>;
}

/**
 * 套件跨字段校验的上下文
 */
export interface SuiteValidateContext {
  /** 不带前缀的内部字段值 */
  values: Record<string, any>;
  /** 按定义字段名读取字段值 */
  valueOf(field: string): any;
  /** 按定义字段名读取字段标签，便于拼装错误信息 */
  labelOf(field: string): string;
  /** 按定义字段名读取内部字段实体 */
  fieldOf(field: string): ComponentModel | undefined;
}

/**
 * 套件定义：一份声明同时描述内部字段与跨字段校验
 */
export interface SuiteDefinition {
  /** 组件类型标识，落在 JSON 的 suiteType 上 */
  type: string;
  /** 调色板与默认标题 */
  label: string;
  /** 调色板提示 */
  description?: string;
  /** 内部字段清单，由代码固定 */
  fields: SuiteFieldDefinition[];
  /** 跨字段校验，返回错误信息；返回 undefined 表示通过 */
  validate?: (context: SuiteValidateContext) => string | undefined;
}
