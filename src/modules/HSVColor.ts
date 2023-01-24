import RGBColor from "./RGBColor";

export module HSVColor {

  function validateHSV(h: number, s: number, v: number, a: number) {
    if (h < 0 || h > 360) throw new Error(`Hue (${h}) must be a number between 0 and 360`);
    if (s < 0 || s > 1) throw new Error(`Saturation (${s}) must be a number between 0 and 1`);
    if (v < 0 || v > 1) throw new Error(`Value (${v}) must be a number between 0 and 1`);
    if (a < 0 || a > 1) throw new Error(`Alpha (${a}) must be a number between 0 and 1`);
  }

  export function toHex(h: number, s: number, v: number, a: number) {
    const {red, green, blue, alpha} = toRGB(h, s, v, a);
    return RGBColor.toHex(red, green, blue, alpha * 2.55);
  }

  export function toRGB(h: number, s: number, v: number, a: number) {
    validateHSV(h, s, v, a);

    return {
      red: asRGBValue(toRGBDecimal(h, s, v, 5)),
      green: asRGBValue(toRGBDecimal(h, s, v, 3)),
      blue: asRGBValue(toRGBDecimal(h, s, v, 1)),
      alpha: asAlphaValue(a)
    };
  }

  function toRGBDecimal(h: number, s: number, v: number, m: 5 | 3 | 1) {
    const k = (m + h / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  }

  function asRGBValue(rgb: number) {
    return Math.min(Math.max(Math.round(rgb * 255), 0), 255);
  }

  function asAlphaValue(rgb: number) {
    return Math.min(Math.max(Math.round(rgb * 100), 0), 100);
  }

  export function toHSL(h: number, s: number, v: number, a: number) {
    validateHSV(h, s, v, a);

    const lightness = getLightnessHSL(s, v);
    const saturation = getSaturationHSL(lightness, v);
    return {hue: h, saturation, lightness, alpha: a};
  }

  function getLightnessHSL(saturation: number, value: number) {
    return value * (1 - saturation / 2);
  }

  function getSaturationHSL(lightness: number, value: number) {
    if (lightness === 0 || lightness === 1) return 0;
    return (value - lightness) / Math.min(lightness, 1 - lightness);
  }
}

export default HSVColor;
