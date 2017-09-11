function hasCssState(elem, stylesheet, stateMap) {
  if (!elem) {
    return false;
  }
  const errors = [];
  for (const k in stateMap) {
    if (!stateMap.hasOwnProperty(k)) { // eslint-disable-line no-prototype-builtins
      continue;
    }
    const mapping = stylesheet.$stylesheet.cssStates({[k]: true});
    if (stateMap[k]) {
      for (const m in mapping) {
        if (!elem.hasAttribute(m)) {
          errors.push(`expected element to have state ":${k}" with mapping to "${m}" but got nothing.`);
        }
      }
    } else {
      for (const m in mapping) {
        if (elem.hasAttribute(m)) {
          errors.push(`expected element to not have state ":${k}" but found with mapping "${m}".`);
        }
      }
    }
  }
  return !errors.length;
}

module.exports.hasCssState = hasCssState;
