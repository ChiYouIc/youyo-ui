<template>
  <a-list class="to-do-list" item-layout="horizontal" :data-source="dataSource" :split="false">
    <template #renderItem="{ item }">
      <a-list-item :style="{ opacity: item.isRead ? 0.4 : null }" @click="handleClick(item)">
        <a-list-item-meta>
          <template #title>
            <span>{{ item.title }}</span>
            <a-tag :color="item.status">{{ item.statusMsg }}</a-tag>
          </template>
          <template #description>
            {{ item.description }}
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useMessageHook from '../../../hooks/useMessageHook';
import './style/toDoList.less';

export default defineComponent({
  name: 'to-do-list',
  props: { dataSource: Array<MsgNotification.Todo> },
  setup() {
    const { infoMsg } = useMessageHook();

    function handleClick(item: { [key: string]: string | boolean }) {
      infoMsg(item.title);
      item.isRead = true;
    }

    return {
      handleClick,
    };
  },
});
</script>
