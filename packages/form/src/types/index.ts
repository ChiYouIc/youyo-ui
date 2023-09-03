/**
 * 组件选择
 */
export type FormComponentType = {
  id: number;
  name: string;
  desc: string;
  component: string;
};

/**
 * 表单设计
 */

export type FormType = {
  name: string;
  author: string;
  type: string;
  description: string;
  items: Array<FormItemType>;
};

export type FormItemType = {
  id: string;
  name: string;
  component: string;
  value: any;
  config: FormItemConfigType;
};

export type FormItemConfigType = {
  defaultValue: any;
  required: boolean; // 是否必填
  rule: string; // 校验规则
  disabled: boolean; // 是否禁用
  placeholder: string; // 占位符
};
