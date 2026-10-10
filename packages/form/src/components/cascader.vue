<template>
  <a-cascader
    :id="id"
    v-model:value="selected"
    :options="options"
    :placeholder="placeholder"
    :disabled="disabled"
    :allow-clear="allowClear"
    :change-on-select="changeOnSelect"
    :show-search="showSearch"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';

type CascaderOption = { label: string; value: string | number; children?: CascaderOption[]; disabled?: boolean };
const props = defineProps<{
  id: string;
  value: Array<string | number>;
  options: CascaderOption[];
  placeholder: string;
  disabled: boolean;
  allowClear: boolean;
  changeOnSelect: boolean;
  showSearch: boolean;
}>();
const emits = defineEmits<{ (event: 'update:value', value: Array<string | number>): void }>();
const selected = computed({
  get: () => props.value,
  set: value => emits('update:value', value),
});
</script>
