<template>
  <a-list class="message-list" item-layout="horizontal" :data-source="dataSource" :split="false">
    <template #renderItem="{ item }">
      <a-list-item :style="{ opacity: item.isRead ? 0.4 : null }" @click="handleClick(item)">
        <a-list-item-meta>
          <template #title>
            {{ item.title }}
          </template>
          <template #avatar>
            <a-avatar :src="item.avatar" />
          </template>
          <template #description>
            <span>{{ item.description }}</span>
            <span>{{ item.date }}</span>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useMessageHook from '../../../hooks/useMessageHook';

export default defineComponent({
  name: 'message-list',
  props: {
    dataSource: Array<MsgNotification.Message>,
  },
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

<style lang="less" scoped></style>
