const undef = 'undefined';

export default function runAction(actionName, params) {
  let action = (typeof this[actionName] == undef || actionName === null) ? 'shouldDefaultAction' : actionName;
  return this[action].call(this, params);
}
