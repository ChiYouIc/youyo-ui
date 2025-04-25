<template>
  <div class="form-preview">
    <div class="form-preview--content" :style="style">
      <div class="title">
        <span>{{ form.name }}</span>
      </div>
      <y-form :model="data" :form="form">
        <template v-for="item in form.components" :key="item.primaryId()">
          <!-- 栅栏 -->
          <form-fence-item v-if="item.component === 'Fence'" :fence="item as Fence" />
          <!-- 表格 -->
          <y-form-item v-else :component="item" />
        </template>
      </y-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import './style/index.less';
import { computed, defineProps, provide } from 'vue';
import FormFenceItem from './formFenceItem.vue';
import YForm from './form.vue';
import YFormItem from './formItem.vue';
import type { Form } from '../core';
import { Fence } from '../core/entity';

interface PreviewProps {
  form: Form;
  data: Record<string, any>;
  mode: 'form' | 'text';
}

const props = defineProps<PreviewProps>();
provide('mode', props.mode);

const style = computed(() => ({ width: props.form.width, height: props.form.height }));
</script>

<style scoped></style>
