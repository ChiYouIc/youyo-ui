<template>
  <div class="youyo-form-design">
    <div class="youyo-form-design__content">
      <form-select />
      <form-design :form="form" @preview="onPreview" @click="onDesignComponentClick" />
      <form-config :component="currItem" ref="formConfigRef" />
    </div>
    <a-modal v-model:open="open" width="80%">
      <preview :form="form" :data="formData" />
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import './style/index.less';
import FormSelect from './select.vue';
import FormDesign from './design.vue';
import FormConfig from './config.vue';

import { computed, defineEmits, defineProps, ref } from 'vue';
import Form from '../core/Form';
import AbstractComponent from '../core/AbstractComponent';
import Preview from '../preview/index.vue';

const formConfigRef = ref();

interface DesignEmits {
  (event: 'selected', val: AbstractComponent): void;
}

const emits = defineEmits<DesignEmits>();
const props = defineProps<{ form: Form }>();

const open = ref<boolean>(false);
const currItem = ref<AbstractComponent>();
const formData = computed(() => props.form.formValue());

function onPreview() {
  open.value = true;
}

function onDesignComponentClick(item: AbstractComponent): void {
  console.log('design index', item);
  emits('selected', item);
  currItem.value = item;
}
</script>

<style scoped></style>
