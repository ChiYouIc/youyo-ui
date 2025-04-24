<template>
  <div class="form-config">
    <a-tabs v-model:active-key="activeKey">
      <a-tab-pane key="Form" tab="表单配置">
        <f-config v-model:form="form" />
      </a-tab-pane>
      <a-tab-pane key="Component" tab="组件配置">
        <template v-if="item">
          <component :is="`${item.component}Config`" v-model:form="item" />
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts">
import './style/config.less';
import { defineComponent, ref } from 'vue';
import {
  DatePicker as DatePickerConfig,
  Fence as FenceConfig,
  Form as FConfig,
  Input as InputConfig,
  InputNumber as InputNumberConfig,
  Radio as RadioConfig,
  Rate as RateConfig,
  Select as SelectConfig,
  Switch as SwitchConfig,
  Table as TableConfig,
  TimePicker as TimePickerConfig,
} from './config';
import type { AbstractComponent } from '../core';

export default defineComponent({
  name: 'form-config',
  components: { InputConfig, SwitchConfig, SelectConfig, InputNumberConfig, RadioConfig, RateConfig, TimePickerConfig, DatePickerConfig, TableConfig, FenceConfig, FConfig },
  props: {
    form: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const activeKey = ref<'Component' | 'Form'>('Form');
    const item = ref<AbstractComponent>();
    const type = ref<string>('');

    function switchFormItemConfig(componentType: 'Component' | 'Form', component: AbstractComponent) {
      activeKey.value = componentType;
      type.value = componentType;
      if (componentType === 'Component') {
        item.value = component;
      }
    }

    return {
      activeKey,
      item,
      type,
      switchFormItemConfig,
    };
  },
  expose: ['switchFormItemConfig'],
});
</script>

<style scoped></style>
