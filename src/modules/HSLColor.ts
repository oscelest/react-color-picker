
module HSLColor {

  function validateHSL(h: number, s: number, l: number, a: number) {
    if (h < 0 || h > 360) throw new Error("Hue must be a number between 0 and 360");
    if (s < 0 || s > 1) throw new Error("Saturation must be a number between 0 and 1");
    if (l < 0 || l > 1) throw new Error("Lightness must be a number between 0 and 1");
    if (a < 0 || a > 1) throw new Error("Alpha must be a number between 0 and 1");
  }

  export function toHSV(h: number, s: number, l: number, a: number) {
    validateHSL(h, s, l, a);

    const value = getValueHSV(s, l);
    const saturation = getSaturationHSV(value, l);
    return {hue: h, saturation, value, alpha: a};
  }

  function getValueHSV(saturation: number, lightness: number) {
    return lightness + saturation * Math.min(lightness, 1 - lightness);
  }

  function getSaturationHSV(lightness: number, value: number) {
    if (value === 0) return 0;
    return 2 * (1 - lightness / value);
  }

}

export default HSLColor;
