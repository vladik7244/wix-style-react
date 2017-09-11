const namespace = 's' + Math.random().toString(36).slice(2);

const proxy = new Proxy({}, {
  get: (target, name) => {
    if (name === '$stylesheet') {
      return {
        get: name => name,
        cssStates: stateMapping => {
          return stateMapping ? Object.keys(stateMapping).reduce((states, key) => {
            if (stateMapping[key]) {
              states['data-' + namespace.toLowerCase() + '-' + key.toLowerCase()] = true;
            }
            return states;
          }, {}) : {};
        },
        namespace
      };
    }

    if (name === 'default') {
      return proxy;
    }

    return name;
  }
});

module.exports = proxy;
