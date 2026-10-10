import type { Component } from 'vue';
import DatePicker from './DatePicker.vue';
import Cascader from './Cascader.vue';
import Checkbox from './Checkbox.vue';
import Fence from './Fence.vue';
import Form from './Form.vue';
import Input from './Input.vue';
import InputNumber from './InputNumber.vue';
import Radio from './Radio.vue';
import Rate from './Rate.vue';
import Select from './Select.vue';
import Slider from './Slider.vue';
import Suite from './Suite.vue';
import Switch from './Switch.vue';
import Table from './Table.vue';
import TimePicker from './TimePicker.vue';
import Textarea from './Textarea.vue';
import Upload from './Upload.vue';

export { Cascader, Checkbox, DatePicker, Fence, Form, Input, InputNumber, Radio, Rate, Select, Slider, Suite, Switch, Table, Textarea, TimePicker, Upload };

/**
 * 组件配置面板注册表，key 与组件的 component 取值保持一致
 */
export const configPanels: Record<string, Component> = { Cascader, Checkbox, DatePicker, Fence, Form, Input, InputNumber, Radio, Rate, Select, Slider, Suite, Switch, Table, Textarea, TimePicker, Upload };
