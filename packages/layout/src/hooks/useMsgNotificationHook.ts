export interface MsgNotification {
  asyncMsgNotification: () => Promise<Array<MsgNotification.NotificationDataType>>;
}

const msgNotification: MsgNotification = {
  asyncMsgNotification: () => {
    throw new Error('message notification not init');
  },
};

export default function useMsgNotificationHook() {
  return {
    setup: (param: MsgNotification) => {
      msgNotification.asyncMsgNotification = param.asyncMsgNotification;
    },
    ...msgNotification,
  };
}
