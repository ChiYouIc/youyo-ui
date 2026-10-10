<template>
  <div class="form-select">
    <div class="form-panel-heading">
      <div class="form-panel-heading__title">组件库</div>
      <div class="form-panel-heading__description">拖拽组件到画布开始设计</div>
    </div>
    <a-tabs v-model:active-key="activeKey">
      <a-tab-pane key="component" tab="组件">
        <draggable-component data-role="design" v-model:list="globalConfig.componentList" tag="ul" :group="{ name: 'design', pull: 'clone', put: false }" item-key="component" :move="onMove" :clone="onClone">
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
import { isFenceModel } from '../core/types';
import type { ComponentModel, FormModel } from '../core/types';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';
import { useDraggableHook } from '../hooks/index';
import VueJsonPretty from 'vue-json-pretty';
import globalConfig from '../config';
import { ComponentSelectType } from '../types';

const props = defineProps<{ form: FormModel }>();

const activeKey = ref<string>('component');
const formJson = computed(() => props.form.toJson());
const formData = computed(() => props.form.formValue());

function onMove(obj: any) {
  const { draggableMove } = useDraggableHook();
  return draggableMove(obj);
}

/** 取一个当前表单未占用的字段名，name 重复会让 formValue() 归并时相互覆盖 */
function nextFieldName(): string {
  const used = new Set<string>();
  const collect = (components: Array<ComponentModel>) => {
    for (const component of components) {
      used.add(component.name);
      if (isFenceModel(component)) {
        component.list.forEach(cell => collect(cell));
      }
    }
  };
  collect(props.form.components);

  let index = used.size + 1;
  while (used.has(`filed${index}`)) {
    index += 1;
  }
  return `filed${index}`;
}

function onClone(obj: ComponentSelectType): ComponentModel {
  return globalConfig.componentFactory.creator({
    id: uuid.v1(),
    label: obj.name,
    name: nextFieldName(),
    component: obj.component,
    required: false,
    disabled: false,
    defaultValue: null,
  });
}
</script>

<style scoped></style>
