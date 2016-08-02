import Dispatcher from 'core/dispatcher.js';
import ActionTypes from 'const/actions.js';
import Action from 'core/action.js';
import { API } from 'lib/api.js';

let defaultAction = Action.create(function(argument) {
  API.prototype.formRawSubmit.apply(this, arguments);
})

export default {
  shouldDefaultAction: defaultAction,
  shouldFormSubmit: defaultAction,

  goodAddToCart: Action.create(function(argument) {
    API.prototype.goodAddToCart(argument);
  }),
  shouldRemoveGood: API.prototype.goodRemoveFromCart,
  shouldRecountOrder: API.prototype.orderRecount,
  shouldReset: API.prototype.cartReset,
  shouldRefresh: API.prototype.cartRefresh,
  shouldAuth: Action.create(function() {
    API.prototype.userAuth.apply(this, arguments);
  })

}
