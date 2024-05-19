/**
 * 组件选择类型
 */
export type ComponentSelectType = {
  name: string;
  component: ComponentModeType;
  description: string;
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
