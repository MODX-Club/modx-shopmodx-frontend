import Auth from './auth';

export default function(global, $) {
  new Auth({}).bindEvents(global, $);
}
