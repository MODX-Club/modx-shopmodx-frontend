import numeral from 'numeral';

numeral.language('ru', {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
    thousand: 'тыс.',
    million: 'млн.',
    billion: 'млрд.',
    trillion: 'трл.'
  },
  currency: {
    symbol: '&#8381;'
  }
});

numeral.language('ru');

export default numeral;
