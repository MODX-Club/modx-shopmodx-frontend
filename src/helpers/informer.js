import 'cmp/informer/informer.less';
import alertify from 'alertifyjs';

alertify.defaults.notifier.position = 'top-right';

export class Informer {
  constructor(props) {
    this.props = {}
  }

  success(msg) {
    msg
      ? alertify.notify(String(msg), 'success') : null;
  }

  failure(msg) {
    msg
      ? alertify.notify(String(msg), 'error') : false;
  }

  warning(msg) {
    msg
      ? alertify.warning(String(msg), 'error') : false;
  }
}
