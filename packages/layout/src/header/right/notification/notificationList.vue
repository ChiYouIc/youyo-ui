<template>
  <a-list class="notification-list" item-layout="horizontal" :data-source="dataSource" :split="false">
    <template #renderItem="{ item }">
      <a-list-item :style="{ opacity: item.isRead ? 0.4 : null }" @click="handleClick(item)">
        <a-list-item-meta>
          <template #avatar>
            <y-icon :icon="iconType[item.type].icon" size="32px" :color="iconType[item.type].color" />
          </template>
          <template #title>
            {{ item.title }}
          </template>
          <template #description>
            {{ item.date }}
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useMessageHook from '../../../hooks/useMessageHook';
import './style/notificationList.less';

export default defineComponent({
  name: 'notification-list',
  props: { dataSource: Array<MsgNotification.Notification> },
  setup() {
    const iconType = {
      dingtalk: {
        icon: 'circle-fill-dingtalk',
        color: '#0076F6',
      },
      email: {
        icon: 'circle-fill-youjian',
        color: '#FE5D58',
      },
      weixin: {
        icon: 'circle-fill-weixin',
        color: '#30D97B',
      },
      qq: {
        icon: 'circle-fill-QQ',
        color: '#000000',
      },
      collect: {
        icon: 'circle-fill-collect',
        color: '#FFCE3D',
      },
    };

    const { infoMsg } = useMessageHook();

    function handleClick(item: { [key: string]: string | boolean }) {
      infoMsg(item.title);
      item.isRead = true;
    }

    return {
      iconType,
      handleClick,
    };
  },
});
</script>
