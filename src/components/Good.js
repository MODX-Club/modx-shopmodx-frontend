var GoodsActions = require('../actions/GoodsActions');
var serialize = require('form-serialize');
var _ = require('lodash-node');

function _getForm(e) {
  var parent = e.target;
  do parent = parent.parentNode;
  while (parent.nodeName !== "FORM");
  return parent;
}

Good = function(props) {
  this.props = {};
  this.initialize(props || {});
};

Good.prototype = {
  initialize: function(props) {
    _.merge(this.props, props);
    this.bindEvents();
  },
  bindEvents: function() {
    var nodes = document.querySelectorAll(this.props.wrapper);

    [].slice.call(nodes).map(function(el, i, arr) {
      var scope = this;

      el
        .querySelector(this.props.ruler)
        .addEventListener('click', function(e) {
          e.preventDefault();
          scope.shouldAddToCart(e);
        });

    }, this);
  },
  shouldAddToCart: function(event) {

    data = serialize(_getForm(event), {
      hash: true
    });

    delete data.action;

    this.handleAddToCartAction(data, event);

  },
  handleAddToCartAction: function(data, event) {
    GoodsActions.shouldAddToCart({
      data: data
    });
  }
};

module.exports = Good;
