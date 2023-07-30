<template>
  <div class="select-lang">
    <a-dropdown>
      <div>
        <global-outlined />
      </div>
      <template #overlay>
        <a-menu class="select-lang-menu" :selectedKeys="selectedKeys" @click="({ key }) => setLocale(key)">
          <a-menu-item v-for="locale in list" :key="locale.key"> {{ $t('locale.title') }} </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18nStore } from '../../../store';
import useLocaleHook from '../../../hooks/useLocaleHook';
import '../style/locale.less';
export default defineComponent({
  name: 'select-lang',
  setup() {
    const i18nStore = useI18nStore();
    const { list } = useLocaleHook();
    return {
      selectedKeys: computed(() => [i18nStore.locale]),
      list,
      setLocale: i18nStore.setLocale,
    };
  },
});
</script>
