<template>
  <div class="base-tabs">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-for="(tab, index) in tabList" :key="tab.key">
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <span>
              {{ tab.tab }}
              <CloseOutlined v-show="showClose(tab, index)" @click.stop="onClose(tab, index)" />
              <RedoOutlined v-show="showRedo(tab)" @click="onRedo(tab)" />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">关闭</a-menu-item>
                <a-menu-item key="2">关闭其它</a-menu-item>
                <a-menu-item key="3">关闭左侧</a-menu-item>
                <a-menu-item key="4">关闭右侧</a-menu-item>
                <a-menu-item key="5">关闭所有</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </template>
      </a-tab-pane>
      <template #rightExtra>
        <a-dropdown>
          <EllipsisOutlined class="right-extra-more" @click.prevent />
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">关闭其它</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">刷新当前页</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
  </div>
</template>
<script setup lang="ts" name="Tabs">
import './style/index.less';
import { computed, defineEmits, defineProps } from 'vue';
import { CloseOutlined, EllipsisOutlined, RedoOutlined } from '@ant-design/icons-vue';
import type { TabsProps, TabsType } from '../types';

interface TabsEmits {
  (event: 'redo', tab: TabsType): void;

  (event: 'close', tab: TabsType, index: number): void;

  (event: 'click', val: string | number): void;
}

const emits = defineEmits<TabsEmits>();
const props = defineProps<TabsProps>();

const activeKey = computed({
  get: () => props.tabKey,
  set: val => {
    props.modifyTab(val);
    emits('click', val);
  },
});

function showClose(tab: TabsType, index: number) {
  return index !== 0;
}

function onClose(tab: TabsType, index: number) {
  emits('close', tab, index);
}

function showRedo(tab: TabsType) {
  return tab.key === activeKey.value;
}

function onRedo(tab: TabsType) {
  emits('redo', tab);
}
</script>
