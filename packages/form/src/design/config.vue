<template>
  <div class="form-config">
    <a-divider orientation="left">配置</a-divider>
    <template v-if="component">
      <component :is="`${component.component}Config`" v-model:form="component" />
    </template>
  </div>
</template>
<script lang="ts">
import './style/config.less';
import { defineComponent } from 'vue';
import AbstractComponent from '../core/AbstractComponent';
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

export default defineComponent({
  name: 'form-config',
  components: { InputConfig, SwitchConfig, SelectConfig, InputNumberConfig, RadioConfig, RateConfig, TimePickerConfig, DatePickerConfig, TableConfig, FenceConfig },
  props: {
    component: {
      type: Object as PropType<AbstractComponent>,
      required: false,
    },
  },
});
</script>

<style scoped></style>
