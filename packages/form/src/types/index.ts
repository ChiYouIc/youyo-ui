/**
 * 组件选择类型
 */
export type ComponentSelectType = {
  name: string;
  component: ComponentModeType;
  description: string;
};

/**
 * 抽象组件构造方法option
 */
export type AbstractComponentConstructorOption = {
  id: string;
  name: string;
  component: ComponentModeType;
  label?: string;
  required?: boolean;
  disabled?: boolean;
};

/**
 * 组件初始化 option
 */
export type AbstractComponentInitOption<Value> = {
  value: Value;
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

export type DateType = {
  date: string;
  year: string;
  month: string;
  week: string;
  quarter: string;
};
