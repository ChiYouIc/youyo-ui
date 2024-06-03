<template>
  <youyo-form-design :form="form" @selected="onSelected" />
  <a-row>
    <a-col :span="8">
      <vue-json-pretty :showIcon="true" :data="formJson"></vue-json-pretty>
    </a-col>
    <a-col :span="8">
      <vue-json-pretty :showIcon="true" :data="formData"></vue-json-pretty>
    </a-col>
    <a-col :span="8">
      <vue-json-pretty :showIcon="true" :data="currComponentJson"></vue-json-pretty>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
// import sfj from './form.json';
import { uuid } from 'vue-uuid';
import { DesignAbstractComponent, DesignForm, YouyoFormDesign } from 'youyo-form/src';
import VueJsonPretty from 'vue-json-pretty';
import { computed, ref } from 'vue';

// const form = ref<DesignForm>(new DesignForm(sfj.id, sfj.name, sfj.version, sfj.description, sfj.components as []));
const form = ref<DesignForm>(new DesignForm(uuid.v1(), '表单v1', '1.0.0', '这事一个测试表单', []));

const formJson = computed(() => form.value.toJson());
const formData = computed(() => form.value.formValue());
const currComponentJson = ref<string>({});

function onSelected(item: DesignAbstractComponent) {
  currComponentJson.value = JSON.parse(JSON.stringify(item || {}));
}
</script>

<style scoped></style>
