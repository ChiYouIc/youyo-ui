<template>
  <div class="form-config">
    <div class="form-panel-heading">
      <div class="form-panel-heading__title">属性配置</div>
      <div class="form-panel-heading__description">{{ item ? `正在编辑：${item.label || item.component}` : '选择画布中的组件查看和编辑属性' }}</div>
    </div>
    <a-tabs v-model:active-key="activeKey">
      <a-tab-pane key="Form" tab="表单配置">
        <f-config :form="form" />
      </a-tab-pane>
      <a-tab-pane key="Component" tab="组件配置">
        <template v-if="item">
          <component v-if="panel" :is="panel" v-model:form="item" />
          <a-empty v-else :description="`${item.component} 组件暂未提供配置面板`" />
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script setup lang="ts" name="form-config">
import './style/config.less';
import { computed, ref } from 'vue';
import FConfig from './config/Form.vue';
import { configPanels } from './config';
import type { ComponentModel, FormModel } from '../core';

defineProps<{ form: FormModel }>();

const activeKey = ref<'Component' | 'Form'>('Form');
const item = ref<ComponentModel>();

const panel = computed(() => (item.value ? configPanels[item.value.component] : undefined));

function switchFormItemConfig(componentType: 'Component' | 'Form', component: FormModel | ComponentModel) {
  activeKey.value = componentType;
  if (componentType === 'Component') {
    item.value = component as ComponentModel;
  }
}

defineExpose({ switchFormItemConfig });
</script>

<style scoped></style>
