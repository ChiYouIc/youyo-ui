<template>
  <div class="form-design">
    <draggable-component v-model:list="designList" tag="ul" group="design" item-key="id" @change="onChange">
      <template #header>
        <h1>表单</h1>
      </template>
      <template #item="{ element }">
        <li class="design-item" @click="onClick(element)">
          <label :class="{ 'marker-required': element.config.required }">{{ element.name }}</label>
          <component v-if="element.name === 'switch'" v-model:checked="element.config.defaultValue" :is="element.component" :disabled="element.config.disabled" :placeholder="element.config.placeholder" />
          <component v-else v-model:value="element.config.defaultValue" :is="element.component" :disabled="element.config.disabled" :placeholder="element.config.placeholder" />
        </li>
      </template>
    </draggable-component>
    {{ currItem }}
  </div>
</template>

<script setup lang="ts">
import './style/design.less';
import DraggableComponent from 'vuedraggable';
import { ref } from 'vue';
import { FormItemType } from '../types';
import useConfigHook from '../hooks/useConfigHook';

const { setValue } = useConfigHook();

const designList = ref<Array<FormItemType>>([]);
const currItem = ref<FormItemType>();

function onChange(e) {
  const added = e?.added;
  if (added) {
    console.log(added);
  }
}

function onClick(item: FormItemType): void {
  currItem.value = item;
  setValue(item);
}
</script>

<style scoped></style>
