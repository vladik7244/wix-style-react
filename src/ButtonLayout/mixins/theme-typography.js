const extend = require('lodash/extend');

const Typography = require('../../Typography/typography-mixins').Typography;

const DEFAULT_COLOR_INDEX = '2';
const DEFAULT_SMALL_COLOR = '';

const ThemeTypography = optionsArr => {
    const options = {
        colorIndex: optionsArr[0] || DEFAULT_COLOR_INDEX,
        smallColor: optionsArr[1] || DEFAULT_SMALL_COLOR
    };

    let rules = Typography(['t', '1', options.colorIndex]);
    rules['&.heightx-large'] = {
        'font-size': '20px'
    };
    rules['&.heightsmall'] = Typography(['t', '3', options.colorIndex]);
    if (options.smallColor) {
        rules['&.heightsmall'].color = options.smallColor;
    }

    return rules;
};

const DEFAULT_BORDER_COLOR = '';
const DEFAULT_TEXT_COLOR = '';

const Color = optionsArr => {
    const options = {
        backgroundColor: optionsArr[0],
        borderColor: optionsArr[1] || DEFAULT_BORDER_COLOR,
        textColor: optionsArr[2] || DEFAULT_TEXT_COLOR
    };

    let rules = {
        'background-color': options.backgroundColor,
        'border-color': options.borderColor || options.backgroundColor
    };
    if (options.textColor) {
        rules.color = options.textColor;
    }

    return rules;
};

function typographyAndColor(color,
                            colorIndex = DEFAULT_COLOR_INDEX,
                            borderColor = DEFAULT_BORDER_COLOR,
                            textColor = DEFAULT_TEXT_COLOR) {
    return extend(ThemeTypography([colorIndex, textColor]), Color([color, borderColor, textColor]));
}

function extendThemeDisabled(base) {
    return extend(base, {'pointer-events': 'none'});
}

const TRANSPARENT_COLOR = 'transparent';

function transparentColor(color) {
    return Color([TRANSPARENT_COLOR, TRANSPARENT_COLOR, color]);
}

module.exports = {};
module.exports.ThemeTypography = ThemeTypography;
module.exports.Color = Color;
module.exports.typographyAndColor = typographyAndColor;
module.exports.extendThemeDisabled = extendThemeDisabled;
module.exports.transparentColor = transparentColor;
