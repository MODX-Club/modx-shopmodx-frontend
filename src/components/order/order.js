import orderStore from '../../stores/order.store.js';
import actions from 'actions/appViewActions.js';
import numeral from 'lib/numeralFormat.js';
import update from 'react/lib/update';
import className from 'classnames';
import populateDataPlaceholders from 'lib/populateDataPlaceholders.js';

function getCartData() {
  return orderStore.getCartData();
}

function _getParent(e, nodeName) {
  var parent = $(e.target).parents(nodeName + ':first');
  return parent[0] || null;
}

var Order = function(props) {
  this.props = {};
  this.initialize(props || {});
};

Order.prototype = {
  initialize: function(props) {
    orderStore.addChangeListener(this.onChange.bind(this));

    this.props = update({}, {
      $merge: props
    })

  },

  bindEvents: function(global, $) {
    var node = $(this.props.wrapper);
    if (!node.length)
      return;

    $('body').on('click', this.props.wrapper + ' [data-smodx-behav]', this, function(e) {

      var _this = e.data;
      var el = $(this);

      switch (el.attr('data-smodx-behav')) {

        case _this.props.behaviour.delete:
          _this.shouldRemoveGoodFromOrder(e);
          break;

        default:
          return true;
      }

      return false;
    });

    $('body').on('change', this.props.wrapper + ' [data-smodx-behav]', this, function(e) {
      var _this = e.data;
      var el = $(this);

      switch (el.attr('data-smodx-behav')) {

        case _this.props.behaviour.change:
          e.preventDefault();
          _this.shouldChangeGoodQuantityInOrder(e);
          break;

        default:
          return true;
      }

      return false;
    });
  },

  shouldRemoveGoodFromOrder: function(event) {
    // Получаем элемент, по которому кликнули.
    var current = $(event.target);

    // Получаем id товара
    var parent = current.parents('[data-smodx-item="good"]:first');

    var id = parent.attr('data-smodx-item-id');

    // $('[data-smodx-item-id="' + id + '"]').remove();

    var data = {
      product_key: id
    };

    var callback = function(resp) {
      !(function(data) {
        resp.success
          ? $('[data-smodx-item-id="' + data.product_key + '"]').remove()
          : null
      })(data);
    }

    this.handleRemoveGoodFromOrderAction({
      data,
      callback,
      action: 'products/remove'
    }, event);
    return;
  },

  shouldChangeGoodQuantityInOrder: function(event) {
    let node = _getParent(event, 'form');
    let data = $(node).serialize();
    this.handleChangeGoodQuantityInOrderAction({
      data,
      action: $(node).find('[name$="action"]').val() || 'recalculate'
    }, event);
  },

  handleRemoveGoodFromOrderAction: function(args, event) {
    actions.shouldRemoveGood({
      data: args.data,
      callback: args.callback,
      action:args.action
    });
  },

  handleChangeGoodQuantityInOrderAction: function(args, event) {
    actions.shouldRecountOrder({
      data: args.data,
      action:args.action
    });
  },

  processText: function(val) {
    if (val % 10 == 1 && val % 100 != 11) {
      return this.props.declensions.one;
    } else if (val % 10 >= 2 && val % 10 <= 4 && (val % 100 < 10 || val % 100 >= 20)) {
      return this.props.declensions.two;
    } else {
      return this.props.declensions.many;
    }
  },

  onChange: function() {
    populateDataPlaceholders(getCartData(), function(selector, value) {
      let el = $(selector);

      if (value != '') {

        !isNaN(value)
          ? el.text(numeral(value).format())
          : el.text(value);
      }

    });

  }
};

export default Order;
