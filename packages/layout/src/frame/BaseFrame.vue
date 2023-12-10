<template>
  <div class="base-frame-layout">
    <youyo-layout v-bind="layout">
      <template #sidebar>
        <youyo-logo v-bind="logo" style="padding: 12px 10px" />
        <youyo-menu v-bind="menu" @click="handleMenuClick" @select="handleMenuSelect" />
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
            <youyo-search v-bind="search" @change="handleSearchChange" />
            <youyo-avatar v-bind="avatar" />
            <youyo-full-screen />
          </div>
        </div>
      </template>
      <template #tabs>
        <div class="base-frame-tabs">
          <youyo-tabs v-bind="tabProps" @redo="startRedo" @click="handleTabClick" />
        </div>
      </template>
      <template #content>
        <div class="base-frame-content" v-if="!redo">
          <slot></slot>
        </div>
      </template>
      <template #footer>
        <youyo-footer v-bind="footer" />
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
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useAvatarHook, useFooterHook, useLayoutHook, useLogoHook, useMenuHook, useSearchHook } from '../hooks';
import { SearchItemType } from '../hooks/useSearchHook';
import usePageRedoHook from '../hooks/usePageRedoHook';
import useTabsHook from '../hooks/useTabsHook';
import type { ItemType } from 'ant-design-vue';
import { onMounted } from 'vue';

export interface BaseFrameProps {
  homePath: string;
  logoName: string;
  logoImg: string;
  username: string;
  avatarImg: string;
  menuList: ItemType[];
}

const props = defineProps<BaseFrameProps>();

const { redo, startRedo } = usePageRedoHook();
const { layout, switchCollapsible } = useLayoutHook();
const { avatar } = useAvatarHook(props.username, props.avatarImg, [
  {
    title: 'string',
    icon: 'string',
    action: () => console.log('sssss'),
  },
]);
const { footer } = useFooterHook();
const { logo, switchShowName } = useLogoHook(props.logoName, props.logoImg, 50, 50, false);
const { tabProps, addTab } = useTabsHook();
const { menu, switchInlineCollapsed } = useMenuHook(props.menuList, [], [], false, 'light', 'inline');
const { search } = useSearchHook(getSearchItemList(props.menuList, []));

/**
 * 获取全局菜单搜索列表
 * @param menuList 菜单列表
 * @param labels 标签列表
 */
function getSearchItemList(menuList: ItemType[], labels: string[]): SearchItemType[] {
  let result: SearchItemType[] = [];

  for (let menu of menuList) {
    const children = menu.children || [];
    if (children.length === 0) {
      result.push({ label: [...labels, menu.title].join(' >> '), value: menu.key });
      continue;
    }

    result = [...result, ...getSearchItemList(menu.children, [...labels, menu.title])];
  }
  return result;
}

/**
 * 获取菜单的 openKeys
 * @param key 当前菜单 key
 * @param menuList 菜单列表
 */
function findMenuOpenKeys(key: string, menuList: ItemType[]): string[] {
  if (menuList.length === 0) {
    return [];
  }

  let result: string[] = [];
  for (let menu of menuList) {
    if (menu.key === key) {
      result = [menu.key];
      break;
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
 * @param menuList
 */
function findMenuItem(key: string, menuList: ItemType[]): ItemType | null {
  if (menuList.length === 0) {
    return null;
  }

  let res = null;
  for (let menu of menuList) {
    if (menu.key === key) {
      res = menu;
      break;
    }

    res = findMenuItem(key, menu.children || []);
    if (res) {
      break;
    }
  }

  return res;
}

/**
 * 修改 menu 的 openKeys 和 selectKeys
 * @param key
 */
function modifyMenu(key: string) {
  menu.modifyOpenKeys(findMenuOpenKeys(key, props.menuList));
  menu.modifySelectKeys([key]);
}

/**
 * 菜单点击时
 * @param item
 * @param key
 */
function handleMenuClick({ item, key }) {
  addTab({ key: key, tab: item.title, path: key });
}

/**
 * 菜单选中时
 * @param _
 * @param key
 */
function handleMenuSelect({ _, key }) {
  tabProps.modifyTab(key);
}

/**
 * tab 点击时
 * @param key
 */
function handleTabClick(key: string) {
  modifyMenu(key);
}

/**
 * 搜索组件选择时
 * @param key
 */
function handleSearchChange(key: string) {
  const menuItem = findMenuItem(key, props.menuList);
  if (!menuItem) {
    console.warn('not found menu item');
    return;
  }

  modifyMenu(key);
  addTab({ key: menuItem.key, tab: menuItem.title, path: menuItem.path });
  tabProps.modifyTab(key);
}

function switchCol() {
  switchInlineCollapsed();
  switchCollapsible();
  switchShowName();
}

onMounted(() => {
  const menu = findMenuItem(props.homePath, props.menuList);
  if (!menu) {
    throw new Error('not found menu, default home key: ' + props.homePath);
  }

  modifyMenu(menu.key);
  addTab({ key: menu.key, tab: menu.title, path: menu.path });
  tabProps.modifyTab(menu.key);
});
</script>

<style scoped></style>
