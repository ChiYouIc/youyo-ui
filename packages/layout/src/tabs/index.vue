<template>
  <a-tabs :activeKey="tabStore.activeTab" hide-add type="card" @change="fullPath => router.push(fullPath)">
    <a-tab-pane v-for="(tab, index) in tabStore.tabs" :key="tab.path">
      <template #tab>
        <a-dropdown :trigger="['contextmenu']">
          <div>
            <component :is="tab.meta.icon" />
            <span style="margin: 0 5px">{{ tab.meta.title }}</span>
            <span v-show="tab.path === tabStore.activeTab">
              <redo-outlined v-show="app.reloadFlag" @click="app.reloadPage(1000)" class="redo" />
              <sync-outlined v-show="!app.reloadFlag" spin class="redo" />
            </span>
            <close-outlined v-if="tabStore.tabs.length > 1" @click.stop="closeTab(tab.path)" class="close" />
          </div>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0" @click="closeOther(tab.path)">关闭其它</a-menu-item>
              <a-menu-item key="1" @click="closeTabToLeft(tab.path)" :disabled="index === 0">关闭到左侧</a-menu-item>
              <a-menu-item key="2" @click="closeTabToRight(tab.path)" :disabled="index === tabStore.tabs.length - 1">关闭到右侧</a-menu-item>
              <a-menu-item key="3" @click="app.reloadPage(1000)" :disabled="tab.path !== tabStore.activeTab">刷新当前页</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tab-pane>
    <template #rightExtra>
      <a-tooltip title="刷新页面">
        <redo-outlined v-show="app.reloadFlag" style="font-size: 24px; margin-right: 15px" @click="app.reloadPage(1000)" />
        <sync-outlined v-show="!app.reloadFlag" spin style="font-size: 24px; margin-right: 15px" />
      </a-tooltip>
    </template>
  </a-tabs>
</template>

<script lang="ts">
import { useAppStore, useTabStore } from '../store';
import { useRouter } from 'vue-router';
import { defineComponent } from 'vue';
import './style/index.less';

export default defineComponent({
  name: 'youyo-tabs',
  setup() {
    const tabStore = useTabStore();
    const app = useAppStore();

    const router = useRouter();

    const closeTabToLeft = tabStore.removeTabToLeft;
    const closeTabToRight = tabStore.removeTabToRight;
    const closeOther = tabStore.removeOtherTab;

    /** 关闭当前 GlobalTab */
    function closeTab(fullPath: string) {
      const { activeTab, tabs } = tabStore;

      if (fullPath === activeTab) {
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].path === fullPath && i > 0) {
            router.push(tabs[i - 1].path);
          } else if (tabs[i].path === fullPath) {
            router.push(tabs[i + 1].path);
          }
        }
      }
      tabStore.removeTab(fullPath);
    }
    return {
      tabStore,
      app,
      router,
      closeTabToLeft,
      closeTabToRight,
      closeOther,
      closeTab,
    };
  },
});
</script>
