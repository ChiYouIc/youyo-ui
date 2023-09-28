<template>
  <div class="form-design">
    <draggable-component
      :class="['form-design-draggable', form.components.length === 0 ? 'empty-draggable' : '']"
      v-model:list="form.components"
      :move="onMove"
      tag="ul"
      group="design"
      item-key="id"
      @change="onChange"
    >
      <template #header>
        <div class="draggable-header">
          <span class="title">{{ form.name }}</span>
          <a-tooltip :overlayStyle="{ width: '100%' }">
            <template #title>
              <p>Id: {{ form.id }}</p>
              <p>Name: {{ form.name }}</p>
              <p>Version: {{ form.version }}</p>
              <p>Description: {{ form.description }}</p>
            </template>
            <question-circle-outlined />
          </a-tooltip>
          <a-button type="primary" @click="() => form.clear()">清空</a-button>
          <a-button type="primary" @click="onPreview">预览</a-button>
        </div>
      </template>
      <template #item="{ element }">
        <draggable-item :element="element" @click="onClick" @remove="el => form.remove(el)" />
      </template>
    </draggable-component>
    <a-row>
      <a-col :span="12">
        <vue-json-pretty :showIcon="true" :data="formJson"></vue-json-pretty>
      </a-col>
      <a-col :span="12">
        <vue-json-pretty :showIcon="true" :data="currComponentJson"></vue-json-pretty>
      </a-col>
    </a-row>
  </div>
  <a-modal v-model:visible="previewVisible" title="预览">
    <preview />
  </a-modal>
</template>

<script setup lang="ts" name="form-design">
import './style/design.less';

import DraggableComponent from 'vuedraggable';
import { computed, ref } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import AbstractComponent from '../core/AbstractComponent';
import Form from '../core/entity/Form';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import Preview from '../preview/index.vue';
import sfj from './form.json';
import DraggableItem from './draggableItem.vue';
import useDraggableHook from '../hooks/useDraggableHook';

const previewVisible = ref<boolean>(false);
const form = ref<Form>(new Form(sfj.id, sfj.name, sfj.version, sfj.description, sfj.components));
// const form = ref<Form>(new Form(uuid.v1(), '表单v1', '1.0.0', '这事一个测试表单'));
const currItem = ref<AbstractComponent<any>>();

const formJson = computed(() => JSON.parse(JSON.stringify(form.value)));
const currComponentJson = computed(() => JSON.parse(JSON.stringify(currItem.value || {})));

function onChange(e) {
  const added = e?.added;
  if (added) {
    console.log(added);
  }
}

function onClick(item: AbstractComponent<any>): void {
  currItem.value = item;
}

function onPreview() {
  previewVisible.value = !previewVisible.value;
}

function onMove(obj) {
  const { draggableMove } = useDraggableHook();
  return draggableMove(obj);
}
</script>

<style scoped></style>
