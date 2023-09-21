<template>
  <div class="form-design">
    <draggable-component
      :class="['form-design-draggable', form.components.length === 0 ? 'empty-draggable' : '']"
      v-model:list="form.components"
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
        <li class="draggable-item" @click="onClick(element)">
          <div class="draggable-item-label" v-if="element.component !== 'Fence'">
            <label :class="{ 'marker-required': element.required }">{{ element.label }}</label>
          </div>
          <div class="draggable-item-content">
            <factory :el="element" />
          </div>
          <div class="draggable-item-close">
            <CloseOutlined @click.stop="() => form.remove(element)" />
          </div>
        </li>
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
import useConfigHook from '../hooks/useConfigHook';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import AbstractComponent from '../core/AbstractComponent';
import Form from '../core/entity/Form';
import { CloseOutlined, QuestionCircleOutlined } from '@ant-design/icons-vue';
import Factory from '../factory/index.vue';
import Preview from '../preview/index.vue';
import sfj from './form.json';

const previewVisible = ref<boolean>(false);
const { setValue } = useConfigHook();
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
  console.log(item);
  currItem.value = item;
  setValue(item);
}

function onPreview() {
  previewVisible.value = !previewVisible.value;
}
</script>

<style scoped></style>
