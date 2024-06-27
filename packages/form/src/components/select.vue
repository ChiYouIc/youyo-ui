<template>
  <a-select :id="id" style="width: 200px" v-model:value="selectVal" :disabled="disabled" :placeholder="placeholder" :options="options" />
</template>
<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

interface SelectEmits {
  (event: 'update:value', val: any): void;
}

interface SelectProps {
  id: string;
  value: any;
  disabled: boolean;
  placeholder: string;
  options: Array<{ label: string; value: string }>;
}

const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();

const selectVal = computed({
  get: () => props.value,
  set: val => emits('update:value', val),
});
</script>
<style scoped></style>
