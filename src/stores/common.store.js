import { Store } from '../core/store.js';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';

let _state = {};

class CommonStore extends Store {
  getData() {
    return _state;
  }

  set(key, value) {
    _state[key] = value;
  }
}

let store = new CommonStore();

store.dispatchToken = Dispatcher.register(function(payload) {
  var action = payload.action

  __DEV__
    ? console.log(payload.source, payload.action) : false;

  switch (action.actionType) {

    case 'USER_LOGIN':
    case 'FORM_SUBMIT':
      store.emitChange();
      break;
  }

  return true;
})

export default store;
