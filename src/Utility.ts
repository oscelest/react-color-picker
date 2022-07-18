export function getFullHex(hex: string = "") {
  const offset = hex[0] === "#" ? 1 : 0;
  return hex.padEnd(6 + offset, "0").padEnd(8 + offset, "f").padStart(9, "#");
}

export function sanitizeHex(hex: string = "") {
  hex = hex.replace(/(?!^)#|(?!#)[^a-f\d]/g, "");
  hex = hex.slice(0, hex[0] === "#" ? 9 : 8);
  return hex;
}

export function fromHex2HSXRGB(hex: string = "") {
  hex = getFullHex(sanitizeHex(hex));
  return {
    hex,
    red: parseInt(hex.slice(-8, -6), 16) / 255,
    green: parseInt(hex.slice(-6, -4), 16) / 255,
    blue: parseInt(hex.slice(-4, -2), 16) / 255,
    alpha: parseInt(hex.slice(-2), 16) / 2.55
  };
}

export function asHex(value: number = 0, padding: string = "0", length: number = 2) {
  return Math.round(Math.max(0, value)).toString(16).padStart(length, padding);
}

export function fromHSV2Red(hue: number, saturation: number, value: number) {
  return fromHSV2RGB(hue, saturation, value, 5);
}

export function fromHSV2Green(hue: number, saturation: number, value: number) {
  return fromHSV2RGB(hue, saturation, value, 3);
}

export function fromHSV2Blue(hue: number, saturation: number, value: number) {
  return fromHSV2RGB(hue, saturation, value, 1);
}

function fromHSV2RGB(hue: number, saturation: number, value: number, n: number) {
  const k = (n + hue / 60) % 6;
  return Math.round((value - value * saturation * Math.max(0, Math.min(k, 4 - k, 1))) * 255);
}

// n = 0 | Red
// n = 8 | Green
// n = 4 | Blue

export function fromHSL2Red(hue: number, saturation: number, lightness: number) {
  return fromHSL2RGB(hue, saturation, lightness, 0);
}

export function fromHSL2Green(hue: number, saturation: number, lightness: number) {
  return fromHSL2RGB(hue, saturation, lightness, 8);
}

export function fromHSL2Blue(hue: number, saturation: number, lightness: number) {
  return fromHSL2RGB(hue, saturation, lightness, 4);
}

function fromHSL2RGB(hue: number, saturation: number, lightness: number, n: number) {
  const k = (n + hue / 30) % 12;
  return lightness - saturation * Math.min(lightness, 1 - lightness) * Math.max(-1, Math.min(k - 3, 9 - k, 1));
}

export function fromHexToHSVA(input?: string) {
  if (!input) return {};
  const {red, green, blue, alpha} = fromHex2HSXRGB(input);
  const value = getValueHSX(red, blue, green);
  const chroma = getChromaHSX(red, blue, green, value);
  return {
    hue: Math.round(getHueHSX(red, green, blue, value, chroma)),
    saturation: Math.round(getSaturationHSV(value, chroma) * 100),
    value: Math.round(value * 100),
    alpha: Math.round(alpha)
  };
}

export function fromHexToHSLA(input?: string) {
  if (!input) return {};
  const {red, green, blue, alpha} = fromHex2HSXRGB(input);
  const value = getValueHSX(red, blue, green);
  const chroma = getChromaHSX(red, blue, green, value);
  const lightness = getLightnessHSL(value, chroma);
  const saturation = getSaturationHSL(value, lightness);
  const hue = getHueHSX(red, green, blue, value, chroma);
  return {hue, saturation, lightness, alpha};
}

export function getValueHSX(red: number, green: number, blue: number) {
  return Math.max(red, green, blue);
}

export function getChromaHSX(red: number, green: number, blue: number, value: number) {
  return value - Math.min(red, green, blue);
}

export function getHueHSX(red: number, green: number, blue: number, value: number = getValueHSX(red, green, blue), chroma: number = getChromaHSX(red, green, blue, value)) {
  if (chroma === 0) return 0;
  switch (value) {
    case red:
      return 60 * (green - blue) / chroma;
    case green:
      return 60 * (2 + (blue - red) / chroma);
    case blue:
      return 60 * (4 + (red - green) / chroma);
    default:
      throw new Error("Color does not exist.");
  }
}

export function getSaturationHSV(value: number, chroma: number) {
  if (value === 0) return 0;
  return chroma / value;
}

export function getSaturationHSL(value: number, lightness: number) {
  if (lightness === 0 || lightness === 1) return 0;
  return (value - lightness) / Math.min(lightness, 1 - lightness);
}

export function getLightnessHSL(value: number, chroma: number) {
  return value - chroma / 2;
}

export interface RGBA {
  hex: string;
  red: number;
  green: number;
  blue: number;
  alpha: number;
}


