<template>
  <div class="base-tabs">
    <a-tabs v-model:activeKey="activeKey" type="card">
      <a-tab-pane v-for="(tab, index) in tabList" :key="tab.key">
        <template #tab>
          <a-dropdown :trigger="['contextmenu']">
            <span>
              {{ tab.tab }}
              <CloseOutlined v-show="showClose(tab, index)" @click="onClose(tab, index)" />
              <RedoOutlined v-show="showRedo(tab)" @click="onRedo(tab)" />
            </span>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">1st menu item</a-menu-item>
                <a-menu-item key="2">2nd menu item</a-menu-item>
                <a-menu-item key="3">3rd menu item</a-menu-item>
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
import { computed } from 'vue';
import { CloseOutlined, EllipsisOutlined, RedoOutlined } from '@ant-design/icons-vue';

type TabsProps = {
  key: string;
  tab: string;
  path: string;
};

interface TabsEmits {
  (event: 'redo', tab: TabsProps): void;
  (event: 'click', val: string): void;
}

const emits = defineEmits<TabsEmits>();
const props = defineProps<{ tabList: TabsProps[]; tabKey: string; modifyTab: (key: string) => void }>();

const activeKey = computed({
  get: () => props.tabKey,
  set: val => {
    props.modifyTab(val);
    emits('click', val);
  },
});

function showClose(tab: TabsProps, index: number) {
  return index !== 0;
}

function onClose(tab: TabsProps, index: number) {
  props.tabList.splice(index, 1);
}

function showRedo(tab: TabsProps) {
  return tab.key === activeKey.value;
}

function onRedo(tab: TabsProps) {
  emits('redo', tab);
}
</script>
