import Order from './order.js';

export default function(global, $) {

  new Order({
    wrapper: '[data-smodx-basket="order"]',
    item: '[data-smodx-item="good"]',
    idAttr: 'data-smodx-item-id',
    behaviour: {
      delete: 'goodDel',
      change: 'goodNum',
    },
    wrappers: {
      cost: '[data-smodx-data="cost"]'
    },
    declensions: {
      one: 'товар',
      two: 'товарa',
      many: 'товаров'
    }
  }).bindEvents(global, $);

}
