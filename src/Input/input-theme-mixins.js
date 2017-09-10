module.exports = {};

module.exports.ThemeDefault = optionsArr => {
  const options = {
    borderColor: optionsArr[0],
    backgroundColor: optionsArr[1],
    color: optionsArr[2]
  };

  const inputKey = '.input';

  return {
    'border-color': options.borderColor,
    'background-color': options.backgroundColor,
    color: options.color,
    [inputKey]: {color: options.color}
  };
};

module.exports.ThemeHover = optionsArr => {
  const options = {
    backgroundColor: optionsArr[0]
  };

  return {
    '&.root:hover': {'background-color': options.backgroundColor},
    '&.root:hasHover': {'background-color': options.backgroundColor}
  };
};

const DEFAULT_BOX_SHADOW = 'none';

module.exports.ThemeFocus = optionsArr => {
  const options = {
    borderColor: optionsArr[0],
    boxShadow: optionsArr[1] || DEFAULT_BOX_SHADOW
  };

  return {
    '&.root:hasFocus': {
      'border-color': options.borderColor,
      'box-shadow': options.boxShadow
    }
  };
};

module.exports.ThemeError = optionsArr => {
  const options = {
    borderColor: optionsArr[0],
    boxShadow: optionsArr[1] || DEFAULT_BOX_SHADOW
  };

  return {
    '&.root:hasError': {
      'border-color': options.borderColor,
      'box-shadow': options.boxShadow
    }
  };
};

module.exports.ThemeDisable = optionsArr => {
  const options = {
    borderColor: optionsArr[0],
    backgroundColor: optionsArr[1],
    color: optionsArr[2]
  };

  const inputUnitKey = '.input, .unit';

  return {
    '&.root:disabled': {
      'border-color': options.borderColor,
      'background-color': options.backgroundColor,
      color: options.color,
      [inputUnitKey]: {color: options.color}
    }
  };
};

module.exports.ThemeDisableHover = optionsArr => {
  const options = {
    borderColor: optionsArr[0]
  };

  return {
    '&.root:disabled': {
      '&:hover': {'border-color': options.borderColor},
      '&:hasHover': {'border-color': options.borderColor}
    }
  };
};

module.exports.ThemeFlat = optionsArr => {
  const options = {
    color: optionsArr[0]
  };

  const inputKey = '.input';
  const menuArrowPathKey = '.menu-arrow path';

  return {
    [inputKey]: {
      '&::-webkit-input-placeholder': {color: options.color},
      '&:-moz-placeholder': {color: options.color},
      '&::-moz-placeholder': {color: options.color},
      '&:-ms-input-placeholder': {color: `${options.color} !important`},
      color: options.color
    },
    [menuArrowPathKey]: {fill: options.color}
  };
};
