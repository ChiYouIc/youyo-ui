<template>
  <div class="form-preview">
    <div class="title">
      <span>{{ form.name }}</span>
    </div>
    <y-form :model="data">
      <template v-for="item in form.components" :key="item.id">
        <!-- 栅栏 -->
        <form-fence-item v-if="item.component === 'Fence'" :fence="item" />
        <!-- 表格 -->
        <y-form-item v-else :component="item" />
      </template>
    </y-form>
    {{ data }}
  </div>
</template>
<script setup lang="ts">
import './style/index.less';
import { defineProps } from 'vue';
import FormFenceItem from './formFenceItem.vue';
import Form from '../core/Form';
import YForm from './form.vue';
import YFormItem from './formItem.vue';

interface PreviewProps {
  form: Form;
  data: Record<string, any>;
}

defineProps<PreviewProps>();
</script>

<style scoped></style>
