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
import InputConfig from './config/Input.vue';
import SwitchConfig from './config/Switch.vue';
import SelectConfig from './config/Select.vue';
import InputNumberConfig from './config/InputNumber.vue';
import RadioConfig from './config/Radio.vue';
import RateConfig from './config/Rate.vue';
import TimePickerConfig from './config/TimePicker.vue';
import DatePickerConfig from './config/DatePicker.vue';
import TableConfig from './config/Table.vue';
import FenceConfig from './config/Fence.vue';
import FConfig from './config/Form.vue';
import AbstractComponent from '../core/AbstractComponent';

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
