import { message, Modal, notification } from 'ant-design-vue';

export default function () {
  const { info, success, error, warning, loading } = message;
  const confirm = Modal.confirm;
  const openNotification = notification.open;

  return {
    infoMsg: info,
    successMsg: success,
    errorMsg: error,
    warningMsg: warning,
    loadingMsg: loading,
    confirm,
    openNotification,
  };
}
