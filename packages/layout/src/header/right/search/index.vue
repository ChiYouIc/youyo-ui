<template>
  <div class="global-search">
    <div>
      <search-outlined class="global-search-icon" @click="openInput" />
    </div>
    <div class="global-search-input" :style="{ width: inputWidth }">
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
        @change="handleChange"
        @search="handleSearch"
      ></a-select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SelectProps } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { BaseSelectRef } from 'ant-design-vue/es/vc-select';
import { useRouteStore } from '../../../store';
import '../style/search.less';

export default defineComponent({
  name: 'global-search',
  setup() {
    const router = useRouter();

    const search = ref<BaseSelectRef>();
    const inputWidth = ref<string>('0');
    const { routePathList } = useRouteStore();
    const selectOptions = ref<SelectProps['options']>([]);

    const handleSearch = (val: string) => {
      if (!val) {
        selectOptions.value = [];
        return;
      }

      const options: SelectProps['options'] = [];

      for (let i = 0; i < routePathList.length; i++) {
        if (routePathList[i].title.includes(val)) {
          options.push({ label: routePathList[i].title, value: routePathList[i].path });
        }
      }

      selectOptions.value = options;
    };

    const openInput = () => {
      inputWidth.value = '210px';
      search.value?.focus();
    };

    const focusout = () => (inputWidth.value = '0');
    const handleChange = (val: string) => router.push(val);

    return {
      search,
      inputWidth,
      selectOptions,
      handleSearch,
      openInput,
      focusout,
      handleChange,
    };
  },
});
</script>
