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
import AbstractComponent from '../../core/AbstractComponent';

type Form = {
  id: string;
  name: string;
  description: string;
  version: boolean;
  labelWidth: string;
  width: string;
  height: string;
  components: Array<Array<AbstractComponent>>;
  toJson(): string;
  formValue(): string;
};

const props = defineProps<{ form: Form }>();
const emits = defineEmits<{ (event: 'update:form', val: Form): void }>();

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
