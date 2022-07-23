export function getFullHex(hex: string = "") {
  const offset = hex[0] === "#" ? 1 : 0;
  return hex.padEnd(6 + offset, "0").padEnd(8 + offset, "f").padStart(9, "#");
}

export function sanitizeHex(hex: string = "") {
  hex = hex.replace(/(?!^)#|(?!#)[^a-f\d]/g, "");
  hex = hex.slice(0, hex[0] === "#" ? 9 : 8);
  return hex;
}

export function fromHex2HSXRGBA(hex: string = "") {
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

export function fromRGBA2Hex(red: number, green: number, blue: number, alpha: number) {
  return `#${asHex(red)}${asHex(green)}${asHex(blue)}${asHex(alpha * 2.55)}`;
}

export function fromHSLA2Hex(hue: number = 0, saturation: number = 100, lightness: number = 50, alpha: number = 100) {
  saturation /= 100;
  lightness /= 100;
  const red = fromHSL2RGB(hue, saturation, lightness, 0);
  const green = fromHSL2RGB(hue, saturation, lightness, 8);
  const blue = fromHSL2RGB(hue, saturation, lightness, 4);
  return `#${asHex(red)}${asHex(green)}${asHex(blue)}${asHex(alpha * 2.55)}`;
}

function fromHSL2RGB(hue: number, saturation: number, lightness: number, n: number) {
  const k = (n + hue / 30) % 12;
  return Math.round((lightness - saturation * Math.min(lightness, 1 - lightness) * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255);
}

export function fromHex2HSVA(hex?: string) {
  if (!hex) return {};
  const {red, green, blue, alpha} = fromHex2HSXRGBA(hex);
  const value = getValueHSX(red, blue, green);
  const chroma = getChromaHSX(red, blue, green, value);
  return {
    hex,
    hue: getHueHSX(red, green, blue, value, chroma),
    saturation: getSaturationHSV(value, chroma) * 100,
    value: value * 100,
    alpha: alpha * 100
  };
}

export function fromHex2HSLA(hex?: string) {
  if (!hex) return {};
  const {red, green, blue, alpha} = fromHex2HSXRGBA(hex);
  const value = getValueHSX(red, blue, green);
  const chroma = getChromaHSX(red, blue, green, value);
  const lightness = getLightnessHSL(value, chroma);
  return {
    hex,
    hue: Math.round(getHueHSX(red, green, blue, value, chroma)),
    saturation: Math.round(getSaturationHSL(value, lightness) * 100),
    lightness: Math.round(lightness * 100),
    alpha: Math.round(alpha)
  };
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
      return (60 * (green - blue) / chroma);
    case green:
      return (60 * (2 + (blue - red) / chroma));
    case blue:
      return (60 * (4 + (red - green) / chroma));
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
