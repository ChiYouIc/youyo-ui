<template>
  <a-switch v-model:checked="switchVal" :disabled="disabled"></a-switch>
</template>
<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

interface SwitchEmits {
  (event: 'update:value', val: boolean | string | number): void;
}

interface SwitchProps {
  id: string;
  value: boolean | string | number;
  disabled: boolean;
}

const props = defineProps<SwitchProps>();
const emits = defineEmits<SwitchEmits>();

const switchVal = computed({
  get: () => props.value,
  set: val => emits('update:value', val),
});
</script>

<style scoped></style>
