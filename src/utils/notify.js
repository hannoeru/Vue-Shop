import { Notify } from 'quasar';

const notify = function(data, isUpload = false) {
  let message;
  if (isUpload) {
    message = data.success ? '上傳成功' : '上傳失敗';
  } else {
    message = data.message;
  }
  Notify.create({
    type: data.success ? 'positive' : 'negative',
    message: message
  });
};

export default notify;
