import Dispatcher from 'core/dispatcher';
import ActionTypes from 'const/actions';
import { Informer } from 'lib/informer';
import isFunction from 'lib/isFunction';
import handleCallback from 'lib/handleCallback';

let informer = new Informer();

function populateFieldErrors(errors) {
  errors && errors.map(function(node, index) {
    informer.warning(node.msg);
  })
}

function logErrors(object) {
  var {success, message, data} = object.resp,
    method = success ? 'success' : 'failure';

  populateFieldErrors(data)
  informer[method](message);
}

function dispatchEvent(data, actionType) {
  return Dispatcher.handleServerAction({
    data,
    actionType: ActionTypes[actionType]
  });
}

function _dispatchEventForcibly(allow = false) {
  return function(data, actionType) {
    allow && dispatchEvent.apply(null, arguments);
  }
}

let dispatchEventForcibly = _dispatchEventForcibly(true);

function responseDefaultAction(object, actionType) {
  logErrors(object);
  dispatchEventForcibly.apply(null, arguments);

}

let defaultAction = 'didDefaultAction';
export default class Actions {

  didDefaultAction(object) {
    let {callback} = object.req;
    logErrors(object);
    handleCallback(callback, object.resp, object.req);
    dispatchEventForcibly(object, 'XHR_ACTION');
  }

  didGoodAddToCart(object) {
    let {callback} = object.req;
    logErrors(object);
    handleCallback(callback, object.resp, object.req);
    dispatchEventForcibly(object, 'GOOD_ADD');
  }

  didGoodRemoveFromCart(object) {
    let {callback} = object.req;
    logErrors(object);
    handleCallback(callback, object.resp, object.req);
    dispatchEventForcibly(object, 'ORDER_REFRESH');
  }

  didCartRefresh(object) {
    let {callback} = object.req;
    logErrors(object);
    handleCallback(callback, object.resp, object.req);
    dispatchEventForcibly(object, 'CART_REFRESH');
  }

  didCartReset(object) {
    let {callback} = object.req;
    logErrors(object);
    handleCallback(callback, object.resp, object.req);
    dispatchEventForcibly(object, 'CART_RESET');
  }

  didUserAuth(object) {
    let {callback} = object.req;
    logErrors(object);
    handleCallback(callback, object.resp, object.req);
    dispatchEventForcibly(object, 'USER_LOGIN');
  }

  didFormSubmit(object) {
    let {success} = object.resp;
    let {callback} = object.req;

    logErrors(object);
    handleCallback(callback, object.resp, object.req);

    _dispatchEventForcibly(success)(object, 'FORM_SUBMIT');
  }
}
