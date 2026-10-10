<template>
  <a-form :model="f">
    <a-form-item label="id">
      <span>{{ f.id }}</span>
    </a-form-item>
    <a-form-item label="名称">
      <a-input v-model:value="f.name"></a-input>
    </a-form-item>
    <a-form-item label="版本">
      <a-input v-model:value="f.version"></a-input>
    </a-form-item>
    <a-form-item label="描述">
      <a-textarea v-model:value="f.description"></a-textarea>
    </a-form-item>
    <a-form-item label="标签宽度">
      <a-input v-model:value="f.labelWidth"></a-input>
    </a-form-item>
    <a-form-item label="宽">
      <a-input v-model:value="f.width"></a-input>
    </a-form-item>
    <a-form-item label="高">
      <a-input v-model:value="f.height"></a-input>
    </a-form-item>
    <a-form-item label="组件上下间距">
      <a-input-number v-model:value="f.verticalSpacing" :min="0" :max="100" addon-after="px" />
    </a-form-item>
    <a-form-item label="组件左右间距">
      <a-input-number v-model:value="f.horizontalSpacing" :min="0" :max="100" addon-after="px" />
    </a-form-item>
    <a-form-item label="标签与组件排列">
      <a-select v-model:value="f.labelLayout">
        <a-select-option value="horizontal">左右排列</a-select-option>
        <a-select-option value="vertical">上下排列</a-select-option>
      </a-select>
    </a-form-item>
    <!--    <a-form-item label="val-json">
      <span>{{ form.formValue() }}</span>
    </a-form-item>
    <a-form-item label="form-json">
      <span>{{ form.toJson() }}</span>
    </a-form-item>-->
  </a-form>
</template>
<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';
import type { FormModel } from '../../core';

const props = defineProps<{ form: FormModel }>();
const emits = defineEmits<{ (event: 'update:form', val: FormModel): void }>();

const f = computed({
  get() {
    return props.form;
  },
  set(val) {
    emits('update:form', val);
  },
});
</script>
<style scoped></style>
