<template>
  <div class="youyo-form-design">
    <div class="youyo-form-design__content">
      <form-select />
      <form-design
        :components="() => form.components as Array<AbstractComponent>"
        :id="form.id"
        :name="form.name"
        :version="form.version"
        :description="form.description"
        @clean="form.clear"
        @remove="form.remove"
        @preview="onPreview"
        @click="onDesignComponentClick"
      />
      <form-config :component="currItem" ref="formConfigRef" />
    </div>
    <a-row>
      <a-col :span="12">
        <vue-json-pretty :showIcon="true" :data="formJson"></vue-json-pretty>
      </a-col>
      <a-col :span="12">
        <vue-json-pretty :showIcon="true" :data="currComponentJson"></vue-json-pretty>
      </a-col>
    </a-row>
    <a-modal v-model:open="open" width="50%">
      <preview :name="form.name" :components="() => form.components as Array<AbstractComponent>" />
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import './style/index.less';
import FormSelect from './select.vue';
import FormDesign from './design.vue';
import FormConfig from './config.vue';
import VueJsonPretty from 'vue-json-pretty';

import sfj from './form.json';
import { computed, ref } from 'vue';
import Form from '../core/Form';
import AbstractComponent from '../core/AbstractComponent';
import Preview from '../preview/index.vue';

const formConfigRef = ref();

const open = ref<boolean>(false);
const currItem = ref<AbstractComponent>();
const form = ref<Form>(new Form(sfj.id, sfj.name, sfj.version, sfj.description, sfj.components as []));
// const form = ref<Form>(new Form(uuid.v1(), '表单v1', '1.0.0', '这事一个测试表单'));

const formJson = computed(() => form.value.toJson());
const currComponentJson = computed(() => JSON.parse(JSON.stringify(currItem.value || {})));

function onPreview() {
  open.value = true;
}

function onDesignComponentClick(item: AbstractComponent): void {
  console.log('design index', item);
  currItem.value = item;
  // formConfigRef.value?.showConfig(item);
}
</script>

<style scoped></style>
