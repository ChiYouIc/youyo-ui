<template>
  <div class="setting-button" :style="{ right: app.settingDrawerVisible ? '500px' : '0px' }">
    <a-button type="primary" @click="app.toggleSettingDrawerVisible">
      <template #icon>
        <setting-outlined v-if="!app.settingDrawerVisible" />
        <close-outlined v-else />
      </template>
    </a-button>
  </div>
</template>

<script lang="ts" name="SettingButton" setup>
import { useAppStore } from '../../store';
import '../style/settingButton.less';

const app = useAppStore();
</script>
