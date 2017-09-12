const DEFAULT_SIZE = 'large';
const SIZES = {
  large: {
    outerWidth: 45,
    outerHeight: 24,
    innerWidth: 21,
    innerHeight: 22,
    checkedLeft: 23
  },
  small: {
    outerWidth: 36,
    outerHeight: 20,
    innerWidth: 18,
    innerHeight: 18,
    checkedLeft: 17
  },
  'x-small': {
    outerWidth: 28,
    outerHeight: 15,
    innerWidth: 13,
    innerHeight: 13,
    checkedLeft: 14
  }
};

const Size = optionsArr => {
  const options = {
    size: optionsArr[0] || DEFAULT_SIZE
  };

  const size = SIZES[options.size];
  const outerLabelKey = '.outerLabel';
  const innerLabelKey = '.innerLabel';
  const checkedInnerLabelKey = '.inputCheckbox:checked + .outerLabel .innerLabel';

  return {
    [outerLabelKey]: {
      width: `${size.outerWidth}px`,
      height: `${size.outerHeight}px`
    },
    [innerLabelKey]: {
      width: `${size.innerWidth}px`,
      height: `${size.innerHeight}px`
    },
    [checkedInnerLabelKey]: {
      left: `${size.checkedLeft}px`
    }
  };
};

module.exports = {};
module.exports.Size = Size;
