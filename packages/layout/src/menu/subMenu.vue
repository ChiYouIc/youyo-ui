<template>
  <a-sub-menu :key="menuInfo.key">
    <template v-if="menuInfo.icon" #icon>
      <component :is="menuInfo.icon" />
    </template>
    <template #title>
      <span>{{ menuInfo.title }}</span>
    </template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.hidden">
        <template v-if="item.children.length === 0">
          <a-menu-item :key="item.path">
            <template v-if="item.icon" #icon>
              <component :is="item.icon" />
            </template>
            <span>{{ item.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <sub-menu :menu-info="item" :key="item.key" />
        </template>
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts" name="youyo-sub-menu" setup>
export interface SubMenuProps {
  menuInfo: SubMenuInfo;
  // menuClick: (m: SubMenuInfo) => void;
}

export interface SubMenuInfo {
  key: string;
  title: string;
  path: string;
  icon?: string;
  hidden: boolean;
  children: SubMenuInfo[];
}

defineProps<SubMenuProps>();
</script>

<style scoped></style>
