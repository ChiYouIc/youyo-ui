<template>
  <div class="form-select">
    <a-tabs v-model:active-key="activeKey">
      <a-tab-pane key="component" tab="组件">
        <draggable-component id="design" v-model:list="globalConfig.componentList" tag="ul" :group="{ name: 'design', pull: 'clone', put: false }" item-key="id" :move="onMove" :clone="onClone">
          <template #item="{ element }">
            <li :name="element.name" :component="element.component">
              <div class="component-item">
                <span>{{ element.component }}</span>
                <span>{{ element.name }}</span>
                <span>
                  <a-tooltip :title="element.description">
                    <question-circle-outlined />
                  </a-tooltip>
                </span>
              </div>
            </li>
          </template>
        </draggable-component>
      </a-tab-pane>
      <a-tab-pane key="form" tab="Json">
        <vue-json-pretty :showIcon="true" :data="formJson"></vue-json-pretty>
      </a-tab-pane>
      <a-tab-pane key="form-val" tab="Json Value">
        <vue-json-pretty :showIcon="true" :data="formData"></vue-json-pretty>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import './style/select.less';
import { computed, defineProps, ref } from 'vue';
import { uuid } from 'vue-uuid';
import DraggableComponent from 'vuedraggable';
import type { AbstractComponent, Form } from '../core';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { useDraggableHook } from '../hooks/index';
import VueJsonPretty from 'vue-json-pretty';
import globalConfig from '../config';
import { ComponentSelectType } from '../types';

const props = defineProps<{ form: Form }>();

const activeKey = ref<string>('component');
const formJson = computed(() => props.form.toJson());
const formData = computed(() => props.form.formValue());

function onMove(obj: any) {
  const { draggableMove } = useDraggableHook();
  return draggableMove(obj);
}

const count = ref<number>(1);

function onClone(obj: ComponentSelectType): AbstractComponent {
  return globalConfig.componentFactory.creator({
    id: uuid.v1(),
    label: obj.name,
    name: `filed${count.value++}`,
    component: obj.component,
    required: false,
    disabled: false,
    defaultValue: null,
  });
}
</script>

<style scoped></style>
