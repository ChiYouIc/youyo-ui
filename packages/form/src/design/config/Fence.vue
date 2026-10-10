<template>
  <section class="fence-config">
    <header class="fence-config__header">
      <div>
        <h3>栅栏布局</h3>
        <p>设置行列，并将组件拖入单元格。</p>
      </div>
      <span class="fence-config__badge">布局容器</span>
    </header>

    <div class="fence-config__fields">
      <label class="fence-config__field">
        <span>行数</span>
        <a-input-number v-model:value="configForm.row" :min="1" />
      </label>
      <label class="fence-config__field">
        <span>列数</span>
        <a-input-number v-model:value="configForm.col" :min="1" :max="3" />
      </label>
    </div>

    <div class="fence-config__summary">
      <span>{{ configForm.row }} 行 × {{ configForm.col }} 列</span>
      <span>{{ componentCount }} 个组件</span>
    </div>

    <div class="fence-config__preview" :style="previewStyle">
      <span v-for="(_, index) in cellCount" :key="index" :class="{ 'is-filled': configForm.list?.[index]?.[0] }">
        {{ configForm.list?.[index]?.[0] ? '已放置' : '空单元格' }}
      </span>
    </div>

    <p class="fence-config__hint">缩小布局时会自动扩展网格，确保已放置的组件不会丢失。</p>
  </section>
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
.fence-config {
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;

    h3 {
      margin: 0;
      color: #0f172a;
      font-size: 16px;
      font-weight: 600;
    }

    p {
      margin: 5px 0 0;
      color: #64748b;
      font-size: 12px;
    }
  }

  &__badge {
    padding: 4px 8px;
    border-radius: 999px;
    background: #eff6ff;
    color: #2563eb;
    font-size: 11px;
    white-space: nowrap;
  }

  &__fields {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 20px;
  }

  &__field {
    display: grid;
    gap: 6px;
    color: #475569;
    font-size: 12px;
    font-weight: 500;
  }

  &__summary {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    color: #334155;
    font-size: 12px;
    font-weight: 600;
  }

  &__preview {
    display: grid;
    gap: 6px;
    margin-top: 9px;
    padding: 8px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;

    span {
      display: grid;
      min-height: 36px;
      place-items: center;
      padding: 4px;
      border: 1px dashed #cbd5e1;
      border-radius: 6px;
      background: #fff;
      color: #94a3b8;
      font-size: 10px;
      text-align: center;

      &.is-filled {
        border-style: solid;
        border-color: #bfdbfe;
        background: #eff6ff;
        color: #2563eb;
      }
    }
  }

  &__hint {
    margin: 12px 0 0;
    color: #64748b;
    font-size: 11px;
    line-height: 1.5;
  }
}
</style>
