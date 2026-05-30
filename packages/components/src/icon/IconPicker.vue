<template>
  <div class="icon-picker">
    <a-input v-model:value="currentIcon" :disabled="disabled">
      <template #addonAfter>
        <a-popover placement="bottom" trigger="click">
          <y-icon :icon="currentIcon" />
          <template #title>
            <a-input v-model:value="searchIcon" placeholder="搜索图标" @change="handleSearchIconChange" />
          </template>
          <template #content>
            <div class="icon-picker-popover-content">
              <ul>
                <li v-for="icon in antdIconList" :key="icon" @click="handleSelectIcon(icon)">
                  <y-icon :icon="icon" size="35px" />
                </li>
              </ul>
            </div>
            <div>
              <a-pagination size="small" v-model:current="page" v-model:pageSize="pageSize" :total="antdTotal" @change="handlePageChange" />
            </div>
          </template>
        </a-popover>
      </template>
    </a-input>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import YIcon from './Icon.vue';
import useIcon from './Icon.hook';
import './style/icon-picker.less';
import { iconPicker } from './types';

export default defineComponent({
  name: 'y-icon-picker',
  props: iconPicker,
  components: { YIcon },
  emits: ['selected', 'update:icon'],
  setup(prop, { emit }) {
    const { subAntdList, antdTotal, filterAntdList } = useIcon();

    const pagination = reactive({
      page: 1,
      pageSize: 110,
    });
    const antdIconList = ref<Array<string>>(subAntdList(0, pagination.pageSize));
    const searchIcon = ref<string>('');

    const currentIcon = computed({
      get: () => prop.icon || 'antd-icon-test',
      set: icon => emit('update:icon', icon),
    });

    function handleSelectIcon(icon: string) {
      currentIcon.value = icon;
      emit('selected', icon);
    }

    function handlePageChange() {
      const offset = getPageOffset();
      antdIconList.value = subAntdList(offset.start, offset.end);
    }

    function getPageOffset(): { start: number; end: number } {
      const start = (pagination.page - 1) * pagination.pageSize;
      const end = start + pagination.pageSize;
      return { start, end };
    }

    function handleSearchIconChange() {
      if (searchIcon.value && searchIcon.value.trim() != '') {
        antdIconList.value = filterAntdList(searchIcon.value);
      } else {
        const offset = getPageOffset();
        antdIconList.value = subAntdList(offset.start, offset.end);
      }
    }

    return {
      antdTotal,
      searchIcon,
      currentIcon,
      antdIconList,
      ...toRefs(pagination),
      handleSelectIcon,
      handlePageChange,
      handleSearchIconChange,
    };
  },
});
</script>

<style scoped></style>
