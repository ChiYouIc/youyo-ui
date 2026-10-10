import type { Component } from 'vue';
import DatePicker from './DatePicker.vue';
import Fence from './Fence.vue';
import Form from './Form.vue';
import Input from './Input.vue';
import InputNumber from './InputNumber.vue';
import Radio from './Radio.vue';
import Rate from './Rate.vue';
import Select from './Select.vue';
import Switch from './Switch.vue';
import Table from './Table.vue';
import TimePicker from './TimePicker.vue';
import Upload from './Upload.vue';

export { DatePicker, Fence, Form, Input, InputNumber, Radio, Rate, Select, Switch, Table, TimePicker, Upload };

/**
 * 组件配置面板注册表，key 与组件的 component 取值保持一致
 */
export const configPanels: Record<string, Component> = { DatePicker, Fence, Form, Input, InputNumber, Radio, Rate, Select, Switch, Table, TimePicker, Upload };
