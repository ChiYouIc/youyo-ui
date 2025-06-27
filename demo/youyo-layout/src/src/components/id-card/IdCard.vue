<template>
  <a-input :id="id" style="width: 200px" v-model:value="value" :placeholder="placeholder" :allow-clear="true" :disabled="disabled" :maxlength="maxlength"></a-input>
</template>
<script setup lang="ts">
import { defineProps, defineModel } from 'vue';

const value = defineModel<string>('value');

interface InputProps {
  id: string;
  placeholder: string;
  disabled: boolean;
  maxlength: number;
}

defineProps<InputProps>();
</script>

<style scoped></style>
