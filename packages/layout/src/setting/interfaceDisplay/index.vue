<template>
  <div class="setting-drawer-interface-display">
    <a-divider>界面显示</a-divider>
    <!-- antd 组件大小 -->
    <div class="mb10 space-between">
      <span>设置 antd 组件大小</span>
      <a-radio-group size="default" :value="themeState.configProvider.componentSize" @update:value="themeState.setComponentSize">
        <a-radio-button v-for="(t, index) in Object.getOwnPropertyNames(ComponentSizeEnum)" :key="index" :value="t">{{ ComponentSizeEnum[t] }}</a-radio-button>
      </a-radio-group>
    </div>
    <div class="mb10 space-between">
      <span>页面切换动画类型 </span>
      <a-select :value="themeState.switchAnimation" size="default" style="width: 200px" @change="themeState.setSwitchAnimation">
        <a-select-option v-for="(t, index) in Object.getOwnPropertyNames(SwitchAnimationEnum)" :key="index" :value="t">{{ SwitchAnimationEnum[t] }}</a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script lang="ts" name="InterfaceDisplay" setup>
import { useThemeStore } from '../../store';
import { ComponentSizeEnum, SwitchAnimationEnum } from '../../types/setting';
import '../style/interfaceDisplay.less';

const themeState = useThemeStore();
</script>
