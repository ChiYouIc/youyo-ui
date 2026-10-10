<template>
  <a-checkbox-group
    :id="id"
    v-model:value="selected"
    :options="options"
    :disabled="disabled"
    :class="{ 'is-vertical': direction === 'vertical' }"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

type CheckboxOption = { label: string; value: string | number; disabled?: boolean };
const props = defineProps<{
  id: string;
  value: Array<string | number>;
  options: CheckboxOption[];
  disabled: boolean;
  direction: 'horizontal' | 'vertical';
}>();
const emits = defineEmits<{ (event: 'update:value', value: Array<string | number>): void }>();
const selected = computed({
  get: () => props.value,
  set: value => emits('update:value', value),
});
</script>

<style scoped>
.is-vertical {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
