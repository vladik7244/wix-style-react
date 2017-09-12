const DEFAULT_BOX_SIZING = 'border-box';

module.exports = {};

module.exports.BoxSizing = optionsArr => {
  const options = {
    sizing: optionsArr[0] || DEFAULT_BOX_SIZING
  };

  return {
    'box-sizing': options.sizing,
    '*': {'box-sizing': options.sizing}
  };
};

module.exports.BorderRadius = optionsArr => {
  const options = {
    radius: optionsArr[0]
  };

  return {
    'border-radius': options.radius,
    '&:-webkit-autofill': {'border-radius': options.radius}
  };
};

module.exports.Placeholder = optionsArr => {
  const options = {
    color: optionsArr[0]
  };

  return {
    '&::-webkit-input-placeholder': {color: options.color},
    '&:-moz-placeholder': {color: options.color},
    '&::-moz-placeholder': {color: options.color},
    '&:-ms-input-placeholder': {color: `${options.color} !important`}
  };
};

module.exports.Selection = optionsArr => {
  const options = {
    color: optionsArr[0]
  };

  return {
    '&::selection': {background: options.color},
    '&::-moz-selection': {background: options.color}
  };
};

module.exports.Size = optionsArr => {
  const options = {
    height: optionsArr[0],
    fontSize: optionsArr[1]
  };

  const inputKey = '.input';
  const prefixSuffixKey = '.prefix, .suffix';

  return {
    height: options.height,
    'line-height': `calc(${options.height} - 2px)`,
    'font-size': options.fontSize,
    [inputKey]: {
      display: 'block',
      'font-size': options.fontSize,
      '&:-webkit-autofill': {
        '-webkit-box-shadow': `0 0 0 ${options.height} white inset`
      }
    },
    [prefixSuffixKey]: {
      'margin-top': '-1px',
      height: options.height,
      'line-height': options.height
    }
  };
};
