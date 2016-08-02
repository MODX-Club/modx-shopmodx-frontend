import Product from './product.js';

export default function(global, $) {

  new Product({
    form: 'form',
    wrapper: '[data-smx-class="product"]',
    ruler: '[type="submit"]'
  }).bindEvents(global, $);

}
