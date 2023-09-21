<template>
  <div class="form-config">
    <template v-if="component">
      <component :is="`${component.component}Config`" v-model:form="component" />
    </template>
  </div>
</template>
<script lang="ts">
import './style/config.less';
import useConfigHook from '../hooks/useConfigHook';
import { defineComponent, ref } from 'vue';
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

export default defineComponent({
  name: 'form-config',
  components: { InputConfig, SwitchConfig, SelectConfig, InputNumberConfig, RadioConfig, RateConfig, TimePickerConfig, DatePickerConfig, TableConfig },
  setup() {
    const component = ref<AbstractComponent<any>>();
    const { onChanged } = useConfigHook();
    onChanged(item => (component.value = item));
    return {
      component,
    };
  },
});
</script>

<style scoped></style>
