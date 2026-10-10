import { ComponentSelectType } from './types';
import { AbstractFactory, ComponentConstructorOptionType, Factory } from './core/index';
import { getSuite } from './core/suite/index';
import { Cascader, Checkbox, DatePicker, Fence, Input, InputNumber, Radio, Rate, Select, Slider, Switch, Table, Textarea, TimePicker, Upload } from './core/entity/index';
// 内置套件在模块加载时完成注册，工厂与调色板据此工作
import './suites';

type FormConfigType = {
  componentList?: ComponentSelectType[];
  componentFactory: Factory;
};

type ConfigOption = {
  componentList?: ComponentSelectType[];
  componentFactories?: AbstractFactory[];
};

const factories: AbstractFactory[] = [
  { name: 'Cascader', creator: (c: ComponentConstructorOptionType) => new Cascader(c) },
  { name: 'Checkbox', creator: (c: ComponentConstructorOptionType) => new Checkbox(c) },
  { name: 'Input', creator: (c: ComponentConstructorOptionType) => new Input(c) },
  { name: 'DatePicker', creator: (c: ComponentConstructorOptionType) => new DatePicker(c) },
  { name: 'InputNumber', creator: (c: ComponentConstructorOptionType) => new InputNumber(c) },
  { name: 'Radio', creator: (c: ComponentConstructorOptionType) => new Radio(c) },
  { name: 'Rate', creator: (c: ComponentConstructorOptionType) => new Rate(c) },
  { name: 'Select', creator: (c: ComponentConstructorOptionType) => new Select(c) },
  { name: 'Slider', creator: (c: ComponentConstructorOptionType) => new Slider(c) },
  { name: 'Switch', creator: (c: ComponentConstructorOptionType) => new Switch(c) },
  { name: 'Table', creator: (c: ComponentConstructorOptionType) => new Table(c) },
  { name: 'Textarea', creator: (c: ComponentConstructorOptionType) => new Textarea(c) },
  { name: 'TimePicker', creator: (c: ComponentConstructorOptionType) => new TimePicker(c) },
  { name: 'Upload', creator: (c: ComponentConstructorOptionType) => new Upload(c) },
  { name: 'Fence', creator: (c: ComponentConstructorOptionType) => new Fence(c) },
  {
    name: 'Suite',
    creator: (c: ComponentConstructorOptionType) => {
      const suite = getSuite(c.suiteType);
      if (suite === undefined) {
        throw new Error(`No suite definition found for ${c.suiteType}`);
      }
      return new suite.Entity(c);
    },
  },
];

const globalConfig: FormConfigType = {
  componentList: [
    { name: '输入框', component: 'Input', description: '输入框' },
    { name: '多行输入框', component: 'Textarea', description: '多行文本输入框' },
    { name: '选择框', component: 'Select', description: '选择框' },
    { name: '级联选择', component: 'Cascader', description: '级联选择框' },
    { name: '数字输入框', component: 'InputNumber', description: '数字输入框' },
    { name: '滑块', component: 'Slider', description: '滑块' },
    { name: '单选框', component: 'Radio', description: '单选框' },
    { name: '复选框', component: 'Checkbox', description: '复选框' },
    { name: '评分', component: 'Rate', description: '评分' },
    { name: '开关', component: 'Switch', description: '开关' },
    { name: '时间选择框', component: 'TimePicker', description: '时间选择框' },
    { name: '日期选择框', component: 'DatePicker', description: '日期选择框' },
    { name: '上传', component: 'Upload', description: '上传' },
    { name: '表格', component: 'Table', description: '表格' },
    { name: '栅栏', component: 'Fence', description: '栅栏' },
  ],
  componentFactory: new Factory(factories),
};

export function setupForm(options: Partial<ConfigOption>) {
  const { componentList, componentFactories } = options;
  if (componentList && componentList.length > 0) {
    globalConfig.componentList = componentList;
  }

  if (componentFactories && componentFactories.length > 0) {
    globalConfig.componentFactory = new Factory([...factories, ...componentFactories]);
  }
}

export default globalConfig;
export type { FormConfigType, ConfigOption };
