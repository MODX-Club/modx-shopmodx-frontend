import { Dispatcher } from 'flux';

import '../helpers/isString.js';

import payloadSources from '../constants/payloadSources.js';

function handleAction(action, source) {
  var payload = {
    source: payloadSources[source],
    action: action
  }
  return this.dispatch(payload);
}

Dispatcher.prototype.handleServerAction = function(action) {
  return handleAction.call(this, action, payloadSources.SERVER_ACTION);
}

Dispatcher.prototype.handleViewAction = function(action) {
  if (isString(action)) {
    return handleAction.call(this, {
      actionType: action
    }, payloadSources.VIEW_ACTION);
  }

  return handleAction.call(this, action, payloadSources.VIEW_ACTION);
}

export default new Dispatcher();
