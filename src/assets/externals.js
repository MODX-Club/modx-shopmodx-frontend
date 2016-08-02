import requireAll from 'lib/requireAll';
requireAll(require.context('cmp', true, /^\.\/.*\/(?!i\.).*\.js$/));

// export API to global (omfg)
require('expose?smxAPI!lib/api.js');
