<template>
  <a-upload :id="id" :disabled="disabled" :placeholder="placeholder">
    <a-button>
      <upload-outlined></upload-outlined>
      点击上传
    </a-button>
  </a-upload>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

interface UploadEmits {
  (event: 'update:value', val: boolean | string | number): void;
}

interface UploadProps {
  id: string;
  placeholder: string;
  disabled: boolean;
}

defineProps<UploadProps>();
defineEmits<UploadEmits>();
</script>

<style scoped></style>
