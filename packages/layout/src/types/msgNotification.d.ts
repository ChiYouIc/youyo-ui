declare namespace MsgNotification {
  type NotificationDataType = {
    notificationList: Array<Notification>;
    messageList: Array<Message>;
    todoList: Array<Todo>;
  };

  /**
   * 用户通知
   */
  type Notification = {
    type: string;
    title: string;
    date: string;
    isRead: boolean;
  };

  /**
   * 用户消息
   */
  type Message = {
    avatar: string;
    title: string;
    description: string;
    date: string;
    isRead: boolean;
  };

  /**
   * 用户代办
   */
  type Todo = {
    title: string;
    description: string;
    status: string;
    statusMsg: string;
    isRead: boolean;
  };
}
