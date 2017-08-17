const DEFAULT_TYPE = 't';
const DEFAULT_SIZE = '1';
const DEFAULT_COLOR = '0';

const FONTS_FALLBACK = '"Helvetica Neue", "Helvetica", "Arial", "メイリオ, meiryo", "ヒラギノ角ゴ pro w3", "hiragino kaku gothic pro", "sans-serif"';

const FONTS = {
  FontUltraThin: `"HelveticaNeueW01-UltLt", "HelveticaNeueW02-UltLt", "HelveticaNeueW10-25UltL", ${FONTS_FALLBACK}`,
  FontThin: `"HelveticaNeueW01-Thin", "HelveticaNeueW02-Thin", "HelveticaNeueW10-35Thin", ${FONTS_FALLBACK}`,
  FontLight: `"HelveticaNeueW01-45Ligh", "HelveticaNeueW02-45Ligh", "HelveticaNeueW10-45Ligh", ${FONTS_FALLBACK}`,
  FontRoman: `"HelveticaNeueW01-55Roma", "HelveticaNeueW02-55Roma", "HelveticaNeueW10-55Roma", ${FONTS_FALLBACK}`,
  FontMedium: `"HelveticaNeueW01-65Medi", "HelveticaNeueW02-65Medi", "HelveticaNeueW10-65Medi", ${FONTS_FALLBACK}`,
  FontBold: `"HelveticaNeueW01-75Bold", "HelveticaNeueW02-75Bold", "HelveticaNeueW10-75Bold", ${FONTS_FALLBACK}`
};

const COLORS = {
  D10: '#162d3d',
  D20: '#32536A',
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
    3: {
      font: FONTS.FontLight,
      fontSize: '14px',
      lineHeight: '18px',
      colors: [COLORS.D10, COLORS.D20, COLORS.D80, COLORS.B10, COLORS.GR10, COLORS.R10, COLORS.P10]
    }
  },
  h: {

  }
};

module.exports = {};
module.exports.Typography = optionsArr => {
  const options = {
    type: optionsArr[0] || DEFAULT_TYPE,
    size: optionsArr[1] || DEFAULT_SIZE,
    color: optionsArr[2] || DEFAULT_COLOR
  };

  const typography = TYPOGRAPHY[options.type][options.size];

  return {
    'font-family': typography.font,
    'font-size': typography.fontSize,
    'line-height': typography.lineHeight,
    color: typography.colors[options.color]
  };
};
