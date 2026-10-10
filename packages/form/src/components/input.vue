<template>
  <a-input :id="id" v-model:value="inputVal" :type="type" :placeholder="placeholder" :allow-clear="true" :disabled="disabled" :maxlength="maxlength"></a-input>
</template>
<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

interface InputEmits {
  (event: 'update:value', val: string): void;
}

interface InputProps {
  id: string;
  value: string;
  placeholder: string;
  disabled: boolean;
  maxlength: number;
  type: 'text' | 'password';
}

const props = defineProps<InputProps>();
const emits = defineEmits<InputEmits>();

const inputVal = computed({
  get: () => props.value,
  set: val => emits('update:value', val),
});
</script>

<style scoped></style>
