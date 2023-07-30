<template>
  <div class="setting-drawer-navigation-mode">
    <a-divider>导航模式</a-divider>
    <div class="navigation-mode-items">
      <template v-for="modeItem in Object.getOwnPropertyNames(NavModeEnum)" :key="modeItem">
        <a-tooltip :title="NavModeEnum[modeItem]">
          <div
            :style="themeStore.navMode === modeItem ? navStyle : {}"
            :class="`relative navigation-mode-item mode-item-${modeItem} ${themeStore.navMode === modeItem ? 'bd2' : ''}`"
            @click="onChange(modeItem)"
          >
            <div :class="`absolute sidebar-mini mode-item-${modeItem}-sidebar-mini`"></div>
            <div :class="`absolute content-mini mode-item-${modeItem}-content-mini`"></div>
          </div>
        </a-tooltip>
      </template>
    </div>
  </div>
</template>

<script lang="ts" name="NavigationMode" setup>
import { computed } from 'vue';
import { useThemeStore } from '../../store';
import { NavModeEnum } from '../../types/setting';
import '../style/navigationMode.less';

const themeStore = useThemeStore();

const navStyle = computed(() => {
  const { primaryColor } = themeStore.configProvider;
  return {
    borderColor: primaryColor,
  };
});

function onChange(mode: string) {
  themeStore.setPrimaryMode(mode as EnumType.NavModeType);
}
</script>
