<template>
  <div class="youyo-search">
    <div>
      <search-outlined class="youyo-search-icon" @click="openInput" />
    </div>
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
        @change="action"
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
import useSearchHook from '../hooks/useSearchHook';

const { filter, action } = useSearchHook();

const search = ref<BaseSelectRef>();
const inputWidth = ref<string>('0');
const selectOptions = ref<SelectProps['options']>([]);

function handleSearch(val) {
  selectOptions.value = filter(val);
}

const openInput = () => {
  inputWidth.value = '210px';
  search.value?.focus();
};

const focusout = () => (inputWidth.value = '0');
</script>
