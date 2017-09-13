const DEFAULT_TYPE = 't';
const DEFAULT_SIZE = '1';
const DEFAULT_COLOR = '0';

const FONTS_FALLBACK = 'Helvetica Neue, Helvetica, Arial, メイリオ, meiryo, ヒラギノ角ゴ pro w3, hiragino kaku gothic pro, sans-serif';

const FONTS = {
  FontUltraThin: `HelveticaNeueW01-UltLt, HelveticaNeueW02-UltLt, HelveticaNeueW10-25UltL, ${FONTS_FALLBACK}`,
  FontThin: `HelveticaNeueW01-Thin, HelveticaNeueW02-Thin, HelveticaNeueW10-35Thin, ${FONTS_FALLBACK}`,
  FontLight: `HelveticaNeueW01-45Ligh, HelveticaNeueW02-45Ligh, HelveticaNeueW10-45Ligh, ${FONTS_FALLBACK}`,
  FontRoman: `HelveticaNeueW01-55Roma, HelveticaNeueW02-55Roma, HelveticaNeueW10-55Roma, ${FONTS_FALLBACK}`,
  FontMedium: `HelveticaNeueW01-65Medi, HelveticaNeueW02-65Medi, HelveticaNeueW10-65Medi, ${FONTS_FALLBACK}`,
  FontBold: `HelveticaNeueW01-75Bold, HelveticaNeueW02-75Bold, HelveticaNeueW10-75Bold, ${FONTS_FALLBACK}`
};

const COLORS = {
  D10: '#162d3d',
  D20: '#32536A',
  D50: '#b6c1cd',
  D80: '#ffffff',
  B10: '#3899ec',
  GR10: '#c8c8c8',
  R10: '#ee5951',
  P10: '#aa4dc8'
};

const TYPOGRAPHY = {
  t: {
    1: {
      font: FONTS.FontLight,
      fontSize: '16px',
      lineHeight: '24px',
      colors: [COLORS.D10, COLORS.D20, COLORS.D80, COLORS.B10, COLORS.GR10, COLORS.R10, COLORS.P10]
    },
    2: {
      font: FONTS.FontRoman,
      fontSize: '16px',
      lineHeight: '24px',
      colors: [COLORS.D10, COLORS.D50, COLORS.D80, COLORS.B10]
    },
    3: {
      font: FONTS.FontLight,
      fontSize: '14px',
      lineHeight: '18px',
      colors: [COLORS.D10, COLORS.D20, COLORS.D80, COLORS.B10, COLORS.GR10, COLORS.R10, COLORS.P10]
    },
    4: {
      font: FONTS.FontRoman,
      fontSize: '14px',
      lineHeight: '18px',
      colors: [COLORS.D10, COLORS.D20, COLORS.D80, COLORS.B10]
    },
    5: {
      font: FONTS.FontMedium,
      fontSize: '10px',
      lineHeight: '12px',
      colors: [COLORS.D20, COLORS.D80],
      uppercase: true,
      letterSpacing: '1px'
    },
    6: {
      font: FONTS.FontBold,
      fontSize: '10px',
      lineHeight: '12px',
      colors: [COLORS.D20, COLORS.D80]
    }
  },
  h: {
    0: {
      font: FONTS.FontUltraThin,
      fontSize: '48px',
      lineHeight: '54px',
      colors: [COLORS.D10]
    },
    1: {
      font: FONTS.FontThin,
      fontSize: '36px',
      lineHeight: '48px',
      colors: [COLORS.D10]
    },
    2: {
      font: FONTS.FontLight,
      fontSize: '20px',
      lineHeight: '36px',
      colors: [COLORS.D10, COLORS.D80]
    },
    3: {
      font: FONTS.FontLight,
      fontSize: '13px',
      lineHeight: '24px',
      colors: [COLORS.D20],
      uppercase: true,
      letterSpacing: '2px'
    },
    4: {
      font: FONTS.FontRoman,
      fontSize: '10px',
      lineHeight: '18px',
      colors: [COLORS.D20],
      uppercase: true,
      letterSpacing: '1.2px'
    }
  }
};

const fontMixin = font => () => ({'font-family': font});

module.exports = {};
module.exports.Typography = optionsArr => {
  const options = {
    type: optionsArr[0] || DEFAULT_TYPE,
    size: optionsArr[1] || DEFAULT_SIZE,
    color: optionsArr[2] || DEFAULT_COLOR
  };

  const typography = TYPOGRAPHY[options.type][options.size];

  const rules = {
    'font-family': typography.font,
    'font-size': typography.fontSize,
    'line-height': typography.lineHeight,
    color: typography.colors[options.color]
  };
  if (typography.uppercase) {
    rules['text-transform'] = 'uppercase';
  }
  if (typography.letterSpacing) {
    rules['letter-spacing'] = typography.letterSpacing;
  }

  return rules;
};

Object.keys(FONTS).forEach(fontName => module.exports[fontName] = fontMixin(FONTS[fontName]));
