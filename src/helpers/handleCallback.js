import cb from 'callbacks';
import isFunction from 'lib/isFunction';

export default function handleCallback(callback, responseData, requestData) {
  let hasErrors = false;

  if (isFunction(callback)) {

    hasErrors = callback(responseData);

  } else if (requestData && requestData.action && cb[requestData.action]) {

    let globalCallback = cb[requestData.action][responseData.success ? 'success' : 'failure'];
    if (isFunction(globalCallback)) {
      hasErrors = globalCallback(responseData, requestData);
    }

    return hasErrors;
  }
}
