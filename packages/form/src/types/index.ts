/**
 * 组件选择类型
 */
export type ComponentSelectType = {
  id: number;
  name: ComponentModeType;
  desc: string;
  component: string;
};

export type ComponentOption = Pick<ComponentSelectType, 'name' | 'component'> & {
  id: string;
};

export enum ComponentMode {
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
