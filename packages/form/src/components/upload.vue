<template>
  <a-upload
    :id="id"
    :disabled="disabled"
    :file-list="fileList"
    :accept="accept"
    :multiple="multiple"
    :max-count="multiple ? maxCount : 1"
    :before-upload="beforeUpload"
    @change="onChange"
  >
    <a-button>
      <upload-outlined></upload-outlined>
      {{ placeholder }}
    </a-button>
  </a-upload>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import { message } from 'ant-design-vue';
import type { UploadValue } from '../core/types';

interface UploadEmits {
  (event: 'update:value', val: UploadValue): void;
}

interface UploadProps {
  id: string;
  placeholder: string;
  disabled: boolean;
  value: UploadValue;
  accept: string;
  multiple: boolean;
  maxCount?: number;
  maxSize?: number;
}

const props = defineProps<UploadProps>();
const emits = defineEmits<UploadEmits>();

const fileList = computed({
  get: () => props.value ?? [],
  set: val => emits('update:value', val),
});

function onChange(info: { fileList: UploadValue }) {
  fileList.value = info.fileList.filter(file => !props.maxSize || typeof file.size !== 'number' || file.size <= props.maxSize * 1024 * 1024);
}

function beforeUpload(file: { name: string; size: number }): boolean {
  if (props.maxSize && file.size > props.maxSize * 1024 * 1024) {
    message.error(`${file.name} 超过 ${props.maxSize} MB 限制`);
    return false;
  }
  return false;
}
</script>

<style scoped></style>
