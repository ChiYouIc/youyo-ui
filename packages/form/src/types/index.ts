/**
 * 组件选择类型
 */
export type ComponentSelectType = {
  id: number;
  name: ComponentModeType;
  desc: string;
  component: string;
};

/**
 * 抽象组件构造方法option
 */
export type AbstractComponentConstructorOption = Pick<ComponentSelectType, 'name' | 'component'> & {
  id: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
};

/**
 * 组件初始化 option
 */
export type AbstractComponentInitOption = {};

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
}

export type ComponentModeType = keyof typeof ComponentMode;

export type DateType = {
  date: string;
  year: string;
  month: string;
  week: string;
  quarter: string;
};
