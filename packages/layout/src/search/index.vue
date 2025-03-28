<template>
  <div class="youyo-search">
    <search-outlined class="youyo-search-icon" @click="openInput" />
    <div :style="{ width: inputWidth }" class="youyo-search-input">
      <a-select
        ref="search"
        v-model:value="val"
        :default-active-first-option="true"
        :filter-option="false"
        :not-found-content="null"
        :options="selectOptions"
        :show-arrow="false"
        show-search
        size="small"
        style="width: 210px"
        @change="onSelect"
        @focusout="focusout"
        @search="onSearch"
      ></a-select>
    </div>
  </div>
</template>

<script lang="ts" name="youyo-search" setup>
import './style/index.less';
import { defineEmits, defineProps, ref } from 'vue';
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
