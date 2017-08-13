const Typography = require('./typography-mixins').Typography;

function IconHeight(height) {
    return {
        height: `${height}px`,
        width: `${height}px`,
        'border-radius': `${height / 2}px`,
        padding: '0'
    };
}

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

const Height = optionsArr => {
    const options = {
        height: optionsArr[0] || DEFAULT_HEIGHT
    };

    const height = HEIGHTS[options.height];

    let rules = {
        height: `${height.height}px`,
        'border-radius': `${height.height / 2}px`,
        padding: `0 ${height.padding}px`,
        '&.transparent': {
            padding: `0px ${height.transparentPadding}px`
        }
    };

    if (height.closeHeight) {
        rules['&.close-standard, &.close-dark, &.close-transparent'] = IconHeight(height.closeHeight);
    }

    if (height.supportsIcon) {
        rules['&.icon-greybackground, &.icon-standard, &.icon-standardsecondary, &.icon-white, &.icon-whitesecondary'] =
            IconHeight(height.height);
    }

    if (height.fontSize) {
        rules['font-size'] = `${height.fontSize}px`;
    }

    return rules;
};

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
        color: optionsArr[0],
        borderColor: optionsArr[1] || DEFAULT_BORDER_COLOR,
        textColor: optionsArr[2] || DEFAULT_TEXT_COLOR
    };

    let rules = {
        'background-color': options.color,
        'border-color': options.borderColor || options.color
    };
    if (options.textColor) {
        rules.color = options.textColor;
    }

    return rules;
};

module.exports = {};
module.exports.Height = Height;
module.exports.ThemeTypography = ThemeTypography;
module.exports.Color = Color;