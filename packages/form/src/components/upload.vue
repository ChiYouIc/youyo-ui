<template>
  <a-upload :id="id" :disabled="disabled" :file-list="fileList" @change="onChange">
    <a-button>
      <upload-outlined></upload-outlined>
      {{ placeholder }}
    </a-button>
  </a-upload>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import type { UploadValue } from '../core/types';

interface UploadEmits {
  (event: 'update:value', val: UploadValue): void;
}

interface UploadProps {
  id: string;
  placeholder: string;
  disabled: boolean;
  value: UploadValue;
}

const props = defineProps<UploadProps>();
const emits = defineEmits<UploadEmits>();

const fileList = computed({
  get: () => props.value ?? [],
  set: val => emits('update:value', val),
});

function onChange(info: { fileList: UploadValue }) {
  fileList.value = info.fileList;
}
</script>

<style scoped></style>
