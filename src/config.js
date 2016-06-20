const config = {
  common: {
    defaultFrom: 'marketing@rebrandly.com',
  },
  local: {},
  development: {},
  production: {},
};

export default Object.assign({}, config.common, config[process.env.NODE_ENV || 'local']);
