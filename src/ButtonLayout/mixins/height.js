const DEFAULT_HEIGHT = 'medium';
const HEIGHTS = {
  medium: {
    height: 36,
    padding: 23,
    transparentPadding: 24,
    closeHeight: 18,
    supportsIcon: true
  },
  small: {
    height: 30,
    padding: 17,
    transparentPadding: 18,
    supportsIcon: true
  },
  large: {
    height: 42,
    padding: 29,
    transparentPadding: 30,
    closeHeight: 24
  },
  'x-large': {
    height: 54,
    padding: 35,
    transparentPadding: 30,
    closeHeight: 26,
    fontSize: 20
  }
};

function iconHeight(height) {
  return {
    height: `${height}px`,
    width: `${height}px`,
    'border-radius': `${height / 2}px`,
    padding: '0'
  };
}

const Height = optionsArr => {
  const options = {
    height: optionsArr[0] || DEFAULT_HEIGHT
  };

  const height = HEIGHTS[options.height];

  const rules = {
    height: `${height.height}px`,
    'border-radius': `${height.height / 2}px`,
    padding: `0 ${height.padding}px`,
    '&.transparent': {
      padding: `0px ${height.transparentPadding}px`
    }
  };

  if (height.closeHeight) {
    rules['&.close-standard, &.close-dark, &.close-transparent'] = iconHeight(height.closeHeight);
  }

  if (height.supportsIcon) {
    rules['&.icon-greybackground, &.icon-standard, &.icon-standardsecondary, &.icon-white, &.icon-whitesecondary'] =
      iconHeight(height.height);
  }

  if (height.fontSize) {
    rules['font-size'] = `${height.fontSize}px`;
  }

  return rules;
};

module.exports = {};
module.exports.Height = Height;
