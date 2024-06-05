<template>
  <div class="youyo-search">
    <search-outlined class="youyo-search-icon" @click="openInput" />
    <div class="youyo-search-input" :style="{ width: inputWidth }">
      <a-select
        ref="search"
        style="width: 210px"
        v-model:value="val"
        show-search
        :show-arrow="false"
        :default-active-first-option="true"
        :options="selectOptions"
        :not-found-content="null"
        :filter-option="false"
        size="small"
        @focusout="focusout"
        @change="onSelect"
        @search="onSearch"
      ></a-select>
    </div>
  </div>
</template>

<script lang="ts" setup name="youyo-search">
import './style/index.less';
import { defineProps, defineEmits, ref } from 'vue';
import { SelectProps } from 'ant-design-vue';
import { BaseSelectRef } from 'ant-design-vue/es/vc-select';
import { SearchOutlined } from '@ant-design/icons-vue';
import type { SearchProps } from '../types';

export interface SearchEmit {
  (event: 'select', val: string): void;
}

const props = defineProps<SearchProps>();
const emits = defineEmits<SearchEmit>();

const search = ref<BaseSelectRef>();
const inputWidth = ref<string>('0');
const selectOptions = ref<SelectProps['options']>([]);
const val = ref<string>();

/**
 * 搜索过滤
 * @param val
 */
function onSearch(val: string) {
  if (!val) {
    return [];
  }
  selectOptions.value = props.searchList.filter(v => v.label.includes(val));
  console.log(selectOptions.value);
}

const openInput = () => {
  inputWidth.value = '210px';
  search.value?.focus();
};

const focusout = () => (inputWidth.value = '0');

function onSelect(val: string) {
  emits('select', val);
}
</script>
