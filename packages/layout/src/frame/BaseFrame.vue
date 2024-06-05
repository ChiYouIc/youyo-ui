<template>
  <div class="base-frame-layout">
    <youyo-layout
      :sidebar-collapsed="collapsed"
      :sidebar-theme="theme"
      :sidebar-min-width="layout.sidebarMinWidth"
      :sidebar-max-width="layout.sidebarMaxWidth"
      :header-height="layout.headerHeight"
      :header-is-fixed="layout.headerIsFixed"
      :tabs-height="layout.tabsHeight"
      :tabs-top="layout.tabsTop"
      :footer-height="layout.footerHeight"
      :footer-is-fixed="layout.footerIsFixed"
    >
      <template #sidebar>
        <youyo-logo :width="50" :height="50" :img="logoImg" :name="logoName" :show-name="showLogoName" style="padding: 12px 10px" />
        <youyo-menu
          :menu-list="menu.menuList"
          :theme="theme"
          :mode="menu.mode"
          v-model:inline-collapsed="collapsed"
          v-model:open-keys="menu.openKeys"
          v-model:selected-keys="menu.selectedKeys"
          @click="menuClick"
          @select="menuSelect"
        />
      </template>
      <template #header>
        <div class="base-frame-header">
          <div class="left">
            <span class="fold" @click="switchCol">
              <menu-unfold-outlined v-if="menu.inlineCollapsed" />
              <menu-fold-outlined v-else />
            </span>
          </div>
          <div class="right">
            <youyo-search :search-list="searchList" @select="searchSelect" />
            <youyo-avatar :username="username" :avatar="avatarImg" :menu-item="avatarMenuList" />
            <youyo-full-screen />
          </div>
        </div>
      </template>
      <template #tabs>
        <div class="base-frame-tabs">
          <youyo-tabs v-model:tab-key="tabKey" :tab-list="tabList" @redo="tab => pageReload(tab.path)" @change="tabChange" @close="tabClose" />
        </div>
      </template>
      <template #content>
        <div class="base-frame-content">
          <slot></slot>
        </div>
      </template>
      <template #footer>
        <youyo-footer :content="footerContent" />
      </template>
    </youyo-layout>
  </div>
</template>

<script setup lang="ts" name="youyo-base-frame">
import './style/base.less';
import YouyoMenu from '../menu/index.vue';
import YouyoLayout from '../layout/index.vue';
import YouyoLogo from '../logo/index.vue';
import YouyoAvatar from '../avatar/index.vue';
import YouyoSearch from '../search/index.vue';
import YouyoFooter from '../footer/index.vue';
import YouyoFullScreen from '../screen/index.vue';
import YouyoTabs from '../tabs/index.vue';
import { BaseFrameProps, ItemType, LayoutProps, MenuItemType, MenuProps, SearchItemType, TabsType } from '../types';
import { defineProps, onMounted, reactive, ref } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';

const props = defineProps<BaseFrameProps>();
const collapsed = ref<boolean>(false);
const showLogoName = ref<boolean>(!collapsed.value);
const searchList = getSearchItemList(props.menuList, []);
const layout = reactive<LayoutProps>({
  sidebarTheme: 'light',
  sidebarMinWidth: 80,
  sidebarMaxWidth: 310,
  headerHeight: 64,
  headerIsFixed: true,
  tabsHeight: 41,
  tabsTop: 0,
  footerHeight: 50,
  sidebarCollapsed: false,
  footerIsFixed: true,
});
const menu = reactive<MenuProps>({
  menuList: props.menuList,
  openKeys: [],
  selectedKeys: [],
  inlineCollapsed: true,
  mode: 'inline',
});
const menuItemList = ref<Array<MenuItemType>>([]);
const theme = ref<'light' | 'dark'>('light');
const tabList = ref<TabsType[]>([]);
const tabKey = ref<string | number>('');

/**
 * 添加tab
 */
function addTab(t: TabsType) {
  if (!t) {
    console.warn('params is null');
    return;
  }

  const find = tabList.value.find(tab => tab.key === t.key);
  if (find) {
    console.warn('multiple tab item');
    return;
  }
  tabList.value.push(t);
}

/**
 * 修改tab
 */
function modifyTab(key: string | number) {
  if (!key) {
    console.warn('params is null');
    return;
  }

  if (tabKey.value === key) {
    return;
  }

  const find = tabList.value.find(tab => tab.key === key);
  if (!find) {
    console.warn('not found tab item');
    return;
  }

  tabKey.value = find.key;
}

/**
 * tab 点击时
 * @param key
 */
function tabChange(key: string | number) {
  const tab = tabList.value.find(t => t.key === key);
  if (!tab) {
    throw new Error('not found tab item');
  }
  props.pageChange(tab.path);
  modifyMenu(key);
}

/**
 * tab 页面关闭
 * @param tab
 * @param index
 */
function tabClose(tab: TabsType, index: number) {
  tabList.value.splice(index, 1);
  if (tab.key === tabKey.value) {
    tabKey.value = tabList[index - 1].key;
  }
}

/**
 * 显示logo
 */
function switchShowLogoName() {
  showLogoName.value = !showLogoName.value;
}

/**
 * 获取全局菜单搜索列表
 * @param menuList 菜单列表
 * @param labels 标签列表
 */
function getSearchItemList(menuList: ItemType[], labels: string[]): SearchItemType[] {
  let result: SearchItemType[] = [];

  for (let menu of menuList) {
    if ('path' in menu) {
      result.push({ label: [...labels, menu.title].join(' >> '), value: menu.key, path: menu.path });
      continue;
    }

    if ('children' in menu && 'title' in menu) {
      result = [...result, ...getSearchItemList(menu.children, [...labels, menu.title])];
    }
  }
  return result;
}

/**
 * 获取菜单的 openKeys
 * @param key 当前菜单 key
 * @param menuList 菜单列表
 */
function findMenuOpenKeys(key: string | number, menuList: ItemType[]): (string | number)[] {
  if (menuList.length === 0) {
    return [];
  }

  let result: (string | number)[] = [];
  for (let menu of menuList) {
    if ('key' in menu && menu.key === key) {
      result = [menu.key];
      break;
    }

    if (!('children' in menu)) {
      continue;
    }

    const children = menu.children || [];
    const keys = findMenuOpenKeys(key, children);
    if (keys.length > 0) {
      result = [menu.key, ...keys];
      break;
    }
  }
  return result;
}

/**
 * 根据 key 找到对应的菜单
 * @param key
 */
function findMenuItem(key: string | number): MenuItemType | null {
  const item = menuItemList.value.find(menu => menu.key === key);
  return item || null;
}

/**
 * 修改 menu 的 openKeys 和 selectKeys
 * @param key
 */
function modifyMenu(key: string | number) {
  if (menu.selectedKeys.includes(key)) {
    return;
  }
  menu.openKeys = findMenuOpenKeys(key, props.menuList);
  menu.selectedKeys = [key];
  console.log(menu.openKeys, menu.selectedKeys);
}

/**
 * 菜单点击时
 * @param item
 * @param key
 */
function menuClick({ item, key }) {
  addTab({ key: key, tab: item.title, path: item.path });
}

/**
 * 菜单选中时
 * @param _
 * @param key
 */
function menuSelect({ _, key }) {
  modifyTab(key);
}

/**
 * 搜索组件选择时
 * @param key
 */
function searchSelect(key: string) {
  const menuItem = findMenuItem(key);
  if (!menuItem) {
    console.warn('not found menu item');
    return;
  }
  modifyMenu(key);
  addTab({ key: menuItem.key, tab: menuItem.title, path: menuItem.path });
  modifyTab(key);
  props.pageChange(menuItem.path);
}

function switchCol() {
  collapsed.value = !collapsed.value;
  switchShowLogoName();
}

// 初始化 menuItemList
function initMenuItemList(menuList: ItemType[]) {
  if (menuList.length === 0) {
    return;
  }

  for (let menu of menuList) {
    if ('path' in menu) {
      menuItemList.value.push(menu);
      continue;
    }

    if ('children' in menu) {
      initMenuItemList(menu.children);
    }
  }
}

function initPage() {
  let currentPath = window.location.pathname;
  if (props.basePath && props.basePath.length > 1 && currentPath.startsWith(props.basePath)) {
    currentPath = currentPath.substring(props.basePath.length);
  }

  const menu = menuItemList.value.find(m => m.path === currentPath);
  if (!menu) {
    modifyMenu(-1);
    modifyTab(-1);
    console.warn('not found menu: ' + currentPath);
  } else {
    modifyMenu(menu.key);
    addTab({ key: menu.key, tab: menu.title, path: menu.path });
    modifyTab(menu.key);
  }
}

onMounted(() => {
  // tabList
  tabList.value = props.tabList || [];

  // menuItemList
  initMenuItemList(props.menuList);

  // 页面初始化
  initPage();
});
</script>

<style scoped></style>
