module HexColor {

  export function validateHex(hex?: string) {
    if (!hex?.match(/#[a-f\d]{8}/i)) throw new Error("Hex must be of the form '/#[a-f\\d]{8}/'.");
  }

  export function getRedInt(hex: string) {
    return parseInt(hex.slice(-8, -6), 16);
  }

  export function getGreenInt(hex: string) {
    return parseInt(hex.slice(-6, -4), 16);
  }

  export function getBlueInt(hex: string) {
    return parseInt(hex.slice(-4, -2), 16);
  }

  export function getAlphaInt(hex: string) {
    return parseInt(hex.slice(-2), 16);
  }

  export function toRGB(hex: string) {
    validateHex(hex);

    return {
      hex,
      red: getRedInt(hex),
      green: getGreenInt(hex),
      blue: getBlueInt(hex),
      alpha: Math.round(getAlphaInt(hex) / 2.55)
    };
  }

  export function toHSV(hex: string) {
    return toHSX(hex, true);
  }

  export function toHSL(hex: string) {
    return toHSX(hex, false);
  }

  function toHSX(hex: string, hsv: boolean): {hex: string, hue: number, saturation: number, value: number, alpha: number}
  function toHSX(hex: string, hsv: boolean): {hex: string, hue: number, saturation: number, lightness: number, alpha: number}
  function toHSX(hex: string, hsv: boolean): {hex: string, hue: number, saturation: number, value?: number, lightness?: number, alpha: number} {
    validateHex(hex);

    const red = getRedInt(hex) / 255;
    const green = getGreenInt(hex) / 255;
    const blue = getBlueInt(hex) / 255;
    const alpha = getAlphaInt(hex) / 255;

    const value = getValueHSX(red, green, blue);
    const chroma = getChromaHSX(red, green, blue, value);
    const hue = getHueHSX(red, green, blue, value, chroma);

    if (hsv) {
      return {hex, hue, saturation: getSaturationHSV(value, chroma), value, alpha};
    }
    else {
      return {hex, hue, saturation: getSaturationHSL(value, chroma), lightness: getLightnessHSL(value, chroma), alpha};
    }
  }

  export function getValueHSX(red: number, green: number, blue: number) {
    return Math.max(red, green, blue);
  }

  export function getChromaHSX(red: number, green: number, blue: number, value: number) {
    return value - Math.min(red, green, blue);
  }

  export function getHueHSX(red: number, green: number, blue: number, value: number = getValueHSX(red, green, blue), chroma: number = getChromaHSX(red, green, blue, value)) {
    if (chroma === 0) return 0;

    let hue: number;
    if (value === red) {
      hue = (green - blue) / chroma;
    }
    else if (value === green) {
      hue = 2 + (blue - red) / chroma;
    }
    else if (value === blue) {
      hue = 4 + (red - green) / chroma;
    }
    else {
      hue = 0;
    }

    return 60 * (hue < 0 ? hue + 6 : hue);
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
}

export default HexColor;
