<template>
  <div class="youyo-search">
    <search-outlined class="youyo-search-icon" @click="openInput" />
    <div class="youyo-search-input" :style="{ width: inputWidth }">
      <a-select
        ref="search"
        style="width: 210px"
        show-search
        :show-arrow="false"
        :default-active-first-option="true"
        :options="selectOptions"
        :not-found-content="null"
        :filter-option="false"
        size="small"
        @focusout="focusout"
        @change="checked"
        @search="handleSearch"
      ></a-select>
    </div>
  </div>
</template>

<script lang="ts" setup name="youyo-search">
import { ref } from 'vue';
import './style/index.less';
import { SelectProps } from 'ant-design-vue';
import { BaseSelectRef } from 'ant-design-vue/es/vc-select';
import { SearchOutlined } from '@ant-design/icons-vue';

export interface SearchProps {
  searchList: {
    label: string;
    value: string;
    path: string;
  }[];
  checked: (val: string) => void;
}

const props = defineProps<SearchProps>();

const search = ref<BaseSelectRef>();
const inputWidth = ref<string>('0');
const selectOptions = ref<SelectProps['options']>([]);

/**
 * 搜索过滤
 * @param val
 */
function handleSearch(val: string) {
  if (!val) {
    return [];
  }
  selectOptions.value = props.searchList.filter(v => v.label.includes(val));
}

const openInput = () => {
  inputWidth.value = '210px';
  search.value?.focus();
};

const focusout = () => (inputWidth.value = '0');
</script>
