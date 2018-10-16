// FONTS
// -------------------------
const fontFamilyPrimary = 'System';
const fontFamilyBase = fontFamilyPrimary;

const fontSizeRoot = 16;
const fontSizeBase = fontSizeBase;
const lineHeightBase = 20 / 14;

const fontSizes = {
  xxSmall: fontSizeRoot - 6,
  xSmall: fontSizeRoot - 4,
  small: fontSizeRoot - 2,
  normal: fontSizeRoot,
  large: fontSizeRoot + 2,
  xLarge: fontSizeRoot + 4,
  xxLarge: fontSizeRoot + 6,
};

const headingSizes = {
  h1: 48,
  h2: 32,
  h3: 24,
  h4: 20,
  h5: 16,
  h6: 14,
};

// const headingLineHeight: 20;

// SPACING
// -------------------------

const spacer = fontSizeRoot;
const spacing = {
  xxSmall: spacer * 0.25,
  xSmall: spacer * 0.5,
  small: spacer * 0.75,
  normal: spacer,
  large: spacer * 1.5,
  xLarge: spacer * 2,
  xxLarge: spacer * 3,
};

export default {
  fontFamilyPrimary,
  fontFamilyBase,
  fontSizeRoot,
  fontSizeBase,
  lineHeightBase,
  fontSizes,
  headingSizes,
  spacing,
};
