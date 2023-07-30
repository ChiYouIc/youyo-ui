<template>
  <a-menu class="global-menu" ref="menu" :mode="model" :openKeys="openKeys" :selectedKeys="selectedKeys" :theme="theme" :inline-collapsed="inlineCollapsed" @openChange="onOpenChange">
    <template v-for="route in menuList" :key="route.key">
      <template v-if="!route.hidden">
        <template v-if="route.children.length === 0">
          <router-link :to="route.path" custom v-slot="{ navigate }">
            <a-menu-item :key="route.path" :title="route.meta.title" @click="navigate">
              <template #icon>
                <!-- 使用动态组件渲染 icon -->
                <component :is="route.meta.icon" />
              </template>
              <span>{{ $t('route.meta.title') }}</span>
            </a-menu-item>
          </router-link>
        </template>
        <template v-else>
          <sub-menu :key="route.key" :menu-info="route" />
        </template>
      </template>
    </template>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SubMenu from './subMenu.vue';
import './style/index.less';

export default defineComponent({
  name: 'youyo-menu',
  props: {
    menuList: { type: Array<Menu.MenuType>, required: true },
    openKeys: Array<string>,
    selectedKeys: Array<string>,
    inlineCollapsed: { typr: Boolean, required: true },
    theme: { typr: String, required: true },
    model: { typr: String, required: true },
  },
  emits: ['open-change'],
  components: { SubMenu },
  setup(_, { emit }) {
    const onOpenChange = (oKeys: string[]) => emit('open-change', oKeys);
    return {
      onOpenChange,
    };
  },
});
</script>
