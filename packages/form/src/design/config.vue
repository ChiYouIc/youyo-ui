<template>
  <div class="form-config">
    <a-divider orientation="left">配置</a-divider>
    <template v-if="component">
      <template v-if="type === 'Component'">
        <component :is="`${component.component}Config`" v-model:form="component" />
      </template>
      <template v-if="type === 'Form'">
        <f-config v-model:form="component" />
      </template>
    </template>
  </div>
</template>
<script lang="ts">
import './style/config.less';
import { defineComponent } from 'vue';
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

export default defineComponent({
  name: 'form-config',
  components: { InputConfig, SwitchConfig, SelectConfig, InputNumberConfig, RadioConfig, RateConfig, TimePickerConfig, DatePickerConfig, TableConfig, FenceConfig, FConfig },
  props: {
    component: {
      type: Object,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped></style>
