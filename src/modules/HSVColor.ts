import RGBColor from "./RGBColor";

module HSVColor {

  export function toHex(h: number, s: number, v: number, a: number) {
    const {red, green, blue, alpha} = toRGB(h, s, v, a);
    return RGBColor.toHex(red, green, blue, alpha);
  }

  export function toRGB(h: number, s: number, v: number, a: number) {
    if (h < 0 || h > 360) throw new Error("Hue must be a number between 0 and 360");
    if (s < 0 || s > 1) throw new Error("Saturation must be a number between 0 and 1");
    if (v < 0 || v > 1) throw new Error("Value must be a number between 0 and 1");
    if (a < 0 || a > 1) throw new Error("Alpha must be a number between 0 and 1");

    return {
      red: asRGBValue(toRGBDecimal(h, s, v, 5)),
      green: asRGBValue(toRGBDecimal(h, s, v, 3)),
      blue: asRGBValue(toRGBDecimal(h, s, v, 1)),
      alpha: asRGBValue(a)
    };
  }

  function toRGBDecimal(h: number, s: number, v: number, m: 5 | 3 | 1) {
    const k = (m + h / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  }

  function asRGBValue(rgb: number) {
    return Math.min(Math.max(Math.round(rgb * 255), 0), 255);
  }
}

export default HSVColor;
