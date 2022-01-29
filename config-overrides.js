const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@components': 'src/app/components/',
    '@interfaces': 'src/app/models/interfaces/',
    '@models': 'src/app/models/',
    '@pages': 'src/app/pages/',
    '@services': 'src/app/services/',
    '@shared': 'src/app/shared/'
  })(config);

  return config;
};
