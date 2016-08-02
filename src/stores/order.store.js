import { Store } from 'core/store.js';
import Dispatcher from 'core/dispatcher.js';
import ActionTypes from 'const/actions.js';

let _state = {
  total: 0,
  discount: 0,
  sum_original: 0,
  sum: 0
};

class OrderStore extends Store {
  getCartData() {
    return _state;
  }
}

let store = new OrderStore();

store.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action;
  let data = action.data.resp.object;

  switch (action.actionType) {

    case ActionTypes.GOOD_ADD:

      _state.total = data.total;
      _state.sum_original = data.original_sum;
      _state.sum = data.sum;
      _state.discount = data.discount;

      store.emitChange();
      break;

    case ActionTypes.ORDER_REFRESH:
      store.emitChange();
      break;

    case ActionTypes.CART_REFRESH:
      _state.total = data.total;
      _state.sum = data.sum;
      _state.original_sum = data.original_sum;
      _state.discount = data.discount;

      store.emitChange();
      break;

    case ActionTypes.CART_RESET:
      _state.total = 0;
      _state.sum = 0;
      _state.original_sum = 0;

      store.emitChange();
      break;
  }

  return true;
});

export default store;
