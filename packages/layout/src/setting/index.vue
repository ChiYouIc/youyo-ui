<template>
  <div class="setting-content">
    <a-drawer width="500" placement="right" title="主题配置" destroyOnClose :closable="false" :close="app.closeSettingDrawer" :visible="app.settingDrawerVisible" :drawer-style="{ position: 'absolute' }">
      <div>
        <theme-schema />
        <overall-style />
        <theme-color />
        <navigation-mode />
        <option-interface />
        <interface-display />
      </div>
    </a-drawer>
  </div>
  <setting-button />
</template>

<script lang="ts" name="SettingDrawerContent" setup>
import ThemeSchema from './themeSchema/index.vue';
import OverallStyle from './overallStyle/index.vue';
import ThemeColor from './themeColor/index.vue';
import NavigationMode from './navigationMode/index.vue';
import OptionInterface from './optionInterface/index.vue';
import InterfaceDisplay from './interfaceDisplay/index.vue';
import SettingButton from './settingButton/index.vue';
import { useAppStore } from '../store';
import './style/index.less';

const app = useAppStore();
</script>
