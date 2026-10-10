<template>
  <a-textarea
    :id="id"
    v-model:value="inputVal"
    :placeholder="placeholder"
    :disabled="disabled"
    :maxlength="maxlength"
    :rows="rows"
    :show-count="showCount"
    :allow-clear="allowClear"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  id: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  maxlength: number;
  rows: number;
  showCount: boolean;
  allowClear: boolean;
}>();
const emits = defineEmits<{ (event: 'update:value', value: string): void }>();
const inputVal = computed({
  get: () => props.value,
  set: value => emits('update:value', value),
});
</script>
