const hook = require('css-modules-require-hook');
hook({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
});
require.extensions['.css'] = () => {
  return;
};
require('babel-core/register');
require('./server');
