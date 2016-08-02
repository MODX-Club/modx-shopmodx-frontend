import './auth.less';

import comonStore from '../../stores/common.store';
import update from 'react/lib/update';
import className from 'classnames';

class Auth {

  constructor(props) {
    comonStore.addChangeListener(this.onChange.bind(this));

    this.props = update({}, {
      $merge: props
    })

  }

  bindEvents(global, $) {
    this.$ = $;
  }

  onChange() {
    //   omg. what i'm doing %(
    this.$('.auth__outer').toggleClass('auth__outer--hidden');
    this.$('#LoginModal').modal('hide');
  }
}

export default Auth;
