<template>
  <a-radio-group :id="id" v-model:value="radioVal" :disabled="disabled" :option-type="optionType" :options="options" />
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

interface RadioEmits {
  (event: 'update:value', val: any): void;
}

interface RadioProps {
  id: string;
  value: any;
  disabled: boolean;
  optionType: 'button' | 'default';
  options: Array<{ label: string; value: string; disabled?: boolean }>;
}

const props = defineProps<RadioProps>();
const emits = defineEmits<RadioEmits>();

const radioVal = computed({
  get: () => props.value,
  set: val => emits('update:value', val),
});
</script>

<style scoped></style>
