<template>
  <div class="base-tabs">
    <a-tabs v-model:activeKey="activeKey" type="card" @change="onChange">
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
                <a-menu-item key="2" @click="closeOther">关闭其它</a-menu-item>
                <a-menu-item key="3" @click="closeToLeft(tab, index)">关闭左侧</a-menu-item>
                <a-menu-item key="4" @click="closeToRight(tab, index)">关闭右侧</a-menu-item>
                <a-menu-item key="5" @click="closeAll">关闭所有</a-menu-item>
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
                <a href="javascript:" @click="closeOther">关闭其它</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:" @click="onRedo()">刷新当前页</a>
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
import type { TabsProps, TabsEmits, TabsType } from '../types';

const emits = defineEmits<TabsEmits>();
const props = defineProps<TabsProps>();

const activeKey = computed({
  get: () => props.tabKey,
  set: val => emits('update:tabKey', val),
});

function onChange(val: string | number) {
  emits('change', val);
}

function showClose(tab: TabsType, index: number) {
  return index !== 0;
}

function onClose(tab: TabsType, index: number) {
  console.log(activeKey.value);
  if (tab.key === activeKey.value) {
    let key: string | number;
    if (index === 0) {
      key = props.tabList[1].key;
    } else {
      key = props.tabList[index - 1].key;
    }
    activeKey.value = key;
    onChange(key);
  }

  const tabList = props.tabList;
  tabList.splice(index, 1);
  emits('update:tabList', tabList);
}

function showRedo(tab: TabsType) {
  return tab.key === activeKey.value;
}

function onRedo(tab?: TabsType) {
  if (!tab) {
    tab = props.tabList.find(item => item.key === activeKey.value);
  }

  if (tab) {
    emits('redo', tab);
  }
}

function closeOther() {
  const index = props.tabList.findIndex(item => item.key === activeKey.value);
  if (index === -1) {
    return;
  }
  const tab = props.tabList.find(item => item.key === activeKey.value)!;
  emits('update:tabList', [tab]);
}

function closeToLeft(tab: TabsType, index: number) {
  const activeIndex = props.tabList.findIndex(item => item.key === activeKey.value);
  if (activeIndex === -1) {
    return;
  }

  if (activeIndex < index) {
    activeKey.value = tab.key;
    onChange(tab.key);
  }

  const tabList = props.tabList;
  tabList.splice(1, index);
  emits('update:tabList', tabList);
}

function closeToRight(tab: TabsType, index: number) {
  const activeIndex = props.tabList.findIndex(item => item.key === activeKey.value);
  if (activeIndex === -1) {
    return;
  }

  if (activeIndex > index) {
    activeKey.value = tab.key;
    onChange(tab.key);
  }

  const tabList = props.tabList;
  tabList.splice(index + 1, tabList.length - 1);
  emits('update:tabList', tabList);
}

function closeAll() {
  const home = props.tabList[0];
  activeKey.value = home.key;
  onChange(home.key);
  emits('update:tabList', [home]);
}
</script>
