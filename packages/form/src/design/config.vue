<template>
  <div class="form-config">
    <template v-if="form">
      <component :is="`${form.name}Config`" v-model:form="form" />
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
export default defineComponent({
  name: 'form-config',
  components: { InputConfig, SwitchConfig },
  setup() {
    const form = ref<AbstractComponent>();

    const { onChanged } = useConfigHook();
    onChanged(item => (form.value = item));
    return {
      form,
    };
  },
});
</script>

<style scoped></style>
