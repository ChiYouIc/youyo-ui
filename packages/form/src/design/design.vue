<template>
  <div class="form-design">
    <draggable-component v-model:list="designList" tag="ul" group="design" item-key="id" @change="onChange">
      <template #header>
        <h1>表单</h1>
      </template>
      <template #item="{ element }">
        <li class="design-item" @click="onClick(element)">
          <label :class="{ 'marker-required': element.required }">{{ element.name }}</label>
          <component v-model:key="element.id" :is="element.component" v-bind="element" v-model:value="element.value" v-model:checked="element.value" />
        </li>
      </template>
    </draggable-component>
    <vue-json-pretty :showIcon="true" :data="JSON.parse(JSON.stringify(currItem || {}))"></vue-json-pretty>
  </div>
</template>

<script setup lang="ts" name="form-design">
import './style/design.less';

import DraggableComponent from 'vuedraggable';
import { ref } from 'vue';
import useConfigHook from '../hooks/useConfigHook';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import AbstractComponent from '../core/AbstractComponent';

const { setValue } = useConfigHook();

const designList = ref<Array<AbstractComponent>>([]);
const currItem = ref<AbstractComponent>();

function onChange(e) {
  const added = e?.added;
  if (added) {
    console.log(added);
  }
}

function onClick(item: AbstractComponent): void {
  console.log(item);
  currItem.value = item;
  setValue(item);
}
</script>

<style scoped></style>
