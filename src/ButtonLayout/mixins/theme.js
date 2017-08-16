const ThemeTypography = require('./theme-typography');
const typographyAndColor = ThemeTypography.typographyAndColor;
const extendThemeDisabled = ThemeTypography.extendThemeDisabled;
const transparentColor = ThemeTypography.transparentColor;

/********** Constants **********/

const DEFAULT_DISABLED_COLOR = '#cbd3dc';
const DEFAULT_EMPTY_DISABLED_COLOR = 'transparent';
const DEFAULT_DISABLED_TYPE = 'full';

/********** Disabled looks **********/

const disabledFullLook = () => extendThemeDisabled(typographyAndColor(DEFAULT_DISABLED_COLOR));
const disabledEmptyLook = () => extendThemeDisabled(typographyAndColor(DEFAULT_EMPTY_DISABLED_COLOR, '4', DEFAULT_DISABLED_COLOR));
const disabledCloseLook = () => extendThemeDisabled(transparentColor(DEFAULT_DISABLED_COLOR));

/********** Full theme **********/

const FullTheme = optionsArr => {
  const options = {
    backgroundColor: optionsArr[0],
    hoverColor: optionsArr[1],
    activeColor: optionsArr[2]
  };

  const rules = typographyAndColor(options.backgroundColor, '2');
  rules['&:hover, &.hover'] = typographyAndColor(options.hoverColor);
  rules['&:active, &.active'] = typographyAndColor(options.activeColor || options.backgroundColor);
  rules['&.disabled'] = disabledFullLook();

  return rules;
};

/********** Empty theme **********/

const EmptyTheme = optionsArr => {
  const options = {
    backgroundColor: optionsArr[0],
    borderColor: optionsArr[1],
    textColor: optionsArr[2],
    hoverColor: optionsArr[3],
    activeColor: optionsArr[4]
  };

  const rules = typographyAndColor(options.backgroundColor, '3', options.borderColor, options.textColor);
  rules['&:hover, &.hover'] = typographyAndColor(options.hoverColor);
  rules['&:active, &.active'] = typographyAndColor(options.activeColor || options.borderColor);
  rules['&.disabled'] = disabledEmptyLook();

  return rules;
};

/********** Secondary theme **********/

const SecondaryTheme = optionsArr => {
  const options = {
    backgroundColor: optionsArr[0],
    borderColor: optionsArr[1],
    hoverColor: optionsArr[2],
    activeColor: optionsArr[3],
    colorIndex: optionsArr[4],
    hoverActiveColorIndex: optionsArr[5],
    disabledType: optionsArr[6] || DEFAULT_DISABLED_TYPE
  };

  const rules = typographyAndColor(options.backgroundColor, options.colorIndex, options.borderColor);
  rules['&:hover, &.hover'] = typographyAndColor(options.hoverColor, options.hoverActiveColorIndex);
  rules['&:active, &.active'] = typographyAndColor(options.activeColor, options.hoverActiveColorIndex);
  rules['&.disabled'] = options.disabledType === DEFAULT_DISABLED_TYPE ? disabledFullLook() : disabledEmptyLook();

  return rules;
};

/********** Close theme **********/

const CloseTheme = optionsArr => {
  const options = {
    color: optionsArr[0],
    hoverColor: optionsArr[1],
    activeColor: optionsArr[2]
  };

  const rules = transparentColor(options.color);
  rules['&:hover, &.hover'] = transparentColor(options.hoverColor);
  rules['&:active, &.active'] = transparentColor(options.activeColor);
  rules['&.disabled'] = disabledCloseLook();

  return rules;
};

/********** Exports **********/

module.exports = {};
module.exports.FullTheme = FullTheme;
module.exports.EmptyTheme = EmptyTheme;
module.exports.SecondaryTheme = SecondaryTheme;
module.exports.CloseTheme = CloseTheme;
module.exports.DisabledFullLook = disabledFullLook;
