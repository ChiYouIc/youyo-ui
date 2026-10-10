<template>
  <a-form :model="configForm">
    <a-form-item label="行数" name="row">
      <a-input-number v-model:value="configForm.row" :min="1" />
    </a-form-item>
    <a-form-item label="列数" name="col">
      <a-input-number v-model:value="configForm.col" :min="1" :max="3" />
    </a-form-item>
    <a-form-item label="布局预览">
      <div class="fence-config__preview" :style="previewStyle">
        <span v-for="(_, index) in cellCount" :key="index" :class="{ 'is-filled': configForm.list?.[index]?.[0] }">
          {{ configForm.list?.[index]?.[0] ? '已放置' : '空' }}
        </span>
      </div>
      <p class="fence-config__hint">共 {{ configForm.row }} 行 × {{ configForm.col }} 列，已放置 {{ componentCount }} 个组件；缩小布局时会自动扩展网格，确保已放置的组件不会丢失。</p>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import type { CSSProperties } from 'vue';

interface Form {
  col: number;
  row: number;
  list: Array<Array<unknown>>;
}

const props = defineProps<{ form: Form }>();

const emits = defineEmits<{ (event: 'update:form', val: Form): void }>();

const configForm = computed({
  get() {
    return props.form;
  },
  set(val) {
    emits('update:form', val);
  },
});

const cellCount = computed(() => configForm.value.row * configForm.value.col);
const componentCount = computed(() => configForm.value.list?.filter(cell => cell?.length > 0).length ?? 0);
const previewStyle = computed<CSSProperties>(() => ({
  gridTemplateColumns: `repeat(${configForm.value.col}, minmax(0, 1fr))`,
}));
</script>

<style scoped lang="less">
.fence-config__preview {
  display: grid;
  gap: 6px;
  padding: 8px;
  border-radius: 8px;
  background: var(--youyo-color-fill-tertiary);

  span {
    display: grid;
    min-height: 30px;
    place-items: center;
    padding: 4px;
    border: 1px dashed var(--youyo-color-border);
    border-radius: 6px;
    background: var(--youyo-color-bg-container);
    color: var(--youyo-color-text-tertiary);
    font-size: 11px;
    text-align: center;

    &.is-filled {
      border-style: solid;
      border-color: var(--youyo-color-primary-border);
      background: var(--youyo-color-primary-bg);
      color: var(--youyo-color-primary);
    }
  }
}

.fence-config__hint {
  margin: 8px 0 0;
  color: var(--youyo-color-text-tertiary);
  font-size: 12px;
  line-height: 1.5;
}
</style>
