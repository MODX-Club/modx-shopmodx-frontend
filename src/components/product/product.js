import './layouts/list.layout.less';
import './layouts/page.layout.less';
import './layouts/related.layout.less';

import actions from 'actions/appViewActions.js';
import serialize from 'form-serialize';
import update from 'react/lib/update';
import className from 'classnames';
import join from 'lib/join.js';

let Product = function(props) {
  this.initialize(props || {});
};

Product.prototype = {
  initialize: function(props) {
    this.props = update({}, {
      $merge: props
    })
  },

  bindEvents: function(global) {

    $('body').on('click', join(' ', this.props.wrapper, this.props.ruler), this, function(e) {
      this.shouldAddToCart(e);
    }.bind(this));

  },
  shouldAddToCart: function(event) {
    event.preventDefault();
    let form = $(event.target).parents(this.props.form);

    let data = serialize(form.get(0), {
      hash: true
    });

    delete data.action;
    this.handleAddToCartAction({
      data,
      action: form.find('[name$="action"]').val()
    }, event);

  },

  handleAddToCartAction: function(args, event) {
    actions.goodAddToCart({
      data:args.data,
      action:args.action
    })
  }
};

export default Product;
