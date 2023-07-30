<template>
  <div class="msg-notification">
    <a-dropdown :trigger="['click']" v-model:visible="visible">
      <a-badge count="999">
        <bell-outlined class="bell" shape="square" size="large" />
      </a-badge>
      <template #overlay>
        <a-card class="notification-pane" hoverable>
          <template #cover>
            <a-tabs centered class="notification-pane-tabs" v-model:active-key="tabsActiveKey">
              <a-tab-pane key="notification" class="notification-pane-tab-pane" :tab="$t('sidebar.notification.notification') + notificationCount">
                <notification-list :data-source="listData.notificationList" />
              </a-tab-pane>
              <a-tab-pane key="message" class="notification-pane-tab-pane" :tab="$t('sidebar.notification.message') + messageCount" force-render>
                <message-list :data-source="listData.messageList" />
              </a-tab-pane>
              <a-tab-pane key="to-do" class="notification-pane-tab-pane" :tab="$t('sidebar.notification.to-do') + todoCount">
                <to-do-list :data-source="listData.todoList" />
              </a-tab-pane>
            </a-tabs>
          </template>
          <div class="notification-pane-footer">
            <a-button @click="handleClear">
              {{ $t('sidebar.notification.clear') }}
              {{ $t(`${'sidebar.notification.' + tabsActiveKey}`) }}
            </a-button>
            <span class="line-between"></span>
            <a-button @click="handleMore">{{ $t('sidebar.notification.more') }}</a-button>
          </div>
        </a-card>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, reactive, ref, defineComponent } from 'vue';
import MessageList from './messageList.vue';
import NotificationList from './notificationList.vue';
import ToDoList from './toDoList.vue';

import useMessageHook from '../../../hooks/useMessageHook';
import useMsgNotificationHook from '../../../hooks/useMsgNotificationHook';
import { useI18nStore } from '../../../store';
import './style/index.less';

export default defineComponent({
  name: 'msg-notification',
  components: { MessageList, NotificationList, ToDoList },
  setup() {
    const i18nStore = useI18nStore();
    const { infoMsg } = useMessageHook();
    const { asyncMsgNotification } = useMsgNotificationHook();

    const visible = ref<boolean>(false);
    const tabsActiveKey = ref<string>('notification');

    const listData = reactive<MsgNotification.NotificationDataType>({
      notificationList: [],
      messageList: [],
      todoList: [],
    });

    function dataList() {
      asyncMsgNotification().then(res => {
        listData.notificationList = res.data.notificationList;
        listData.messageList = res.data.messageList;
        listData.todoList = res.data.todoList;
      });
    }

    function handleCount(list: Array<{ isRead: boolean }>): string {
      const length = list.filter(o => !o.isRead).length;
      return length > 0 ? '(' + length + ')' : '';
    }

    function handleClear() {
      infoMsg(i18nStore.i18nRender('sidebar.notification.clear') + i18nStore.i18nRender(`${'sidebar.notification.' + tabsActiveKey.value}`));
    }

    function handleMore() {
      infoMsg(i18nStore.i18nRender('sidebar.notification.more'));
    }

    return {
      todoCount: computed(() => handleCount(listData.todoList)),
      messageCount: computed(() => handleCount(listData.messageList)),
      notificationCount: computed(() => handleCount(listData.notificationList)),
      i18nStore,
      infoMsg,
      asyncMsgNotification,
      visible,
      tabsActiveKey,
      dataList,
      handleClear,
      handleMore,
    };
  },
  mounted() {
    this.dataList();
  },
});
</script>

<style lang="less" scoped>
.msg-notification {
  :deep(.ant-badge-count) {
    top: -8px;
  }

  .bell {
    font-size: 14px;
  }
}

.notification-pane {
  width: 340px;
  max-height: 600px;
  padding: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .notification-pane-tabs {
    flex: 1;
    height: 100%;

    .notification-pane-tab-pane {
      &.opacity {
        opacity: 0.4;
      }
    }
  }

  .notification-pane-footer {
    flex: 0;
    display: flex;
    width: 100%;
    height: 46px;
    border-top: 1px solid #d9d9d9;

    .line-between {
      width: 1px;
      height: 100%;
      border: 1px solid #d9d9d9;
    }

    .ant-btn {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}
</style>
