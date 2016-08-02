import './form.less';
import update from 'react/lib/update';
import actions from 'actions/appViewActions';
import join from 'lib/join';
import showErrors from 'lib/showDataErrors';
import requestAction from 'lib/runAction';

function getParent(node) {
  return node.parents(this.props.classes.form);
}

export default class Form {
  constructor(props) {

    this.props = update({}, {
      $merge: props || {}
    })

  }
  bindEvents(global, $) {
    this.$ = $;

    $(global.document).on('click', join(' ', this.props.classes.form, this.props.classes.button), function(e) {
      e.preventDefault();
      let target = $(e.target);
      this.shouldFormSubmit(target, e);
    }.bind(this));
  }

  shouldFormSubmit(target, event) {
    let form = getParent.call(this, target);
    let callback = function(resp) {
      let respData = resp.data || [];

      if (typeof resp.success != 'undefined') {
        form.data('in_request', false);
      }

      //   TODO: move this stuff to a new HATEOS provider
      if (resp.success && resp.object._link) {
        location.href = resp.object._link.href;
      }
      //   eof TODO

      return showErrors(form, respData);
    }

    if (!form.data('in_request')) {
      form.data('in_request', true);

      requestAction.call(actions, 'shouldFormSubmit', {
        callback,
        data: new FormData(form.get(0)),
        action: form.find('[name$="action"]').val()
      });
    }
  }
}
