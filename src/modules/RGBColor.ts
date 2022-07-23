module RGBColor {

  export function toHex(red: number, green: number, blue: number, alpha: number) {
    return `#${asHex(red)}${asHex(green)}${asHex(blue)}${asHex(alpha)}`;
  }

  function asHex(value: number, padding: string = "0", length: number = 2) {
    return value.toString(16).padStart(length, padding);
  }

  export function toRGB(hue: number, saturation: number, value: number, alpha: number) {
    if (hue < 0 || hue > 360) throw new Error("Hue must be a number between 0 and 360");
    if (saturation < 0 || saturation > 1) throw new Error("Saturation must be a number between 0 and 1");
    if (value < 0 || value > 1) throw new Error("Value must be a number between 0 and 1");
    if (alpha < 0 || alpha > 1) throw new Error("Alpha must be a number between 0 and 1");

    return {
      red: asRGBValue(toRGBDecimal(hue, saturation, value, 5)),
      green: asRGBValue(toRGBDecimal(hue, saturation, value, 3)),
      blue: asRGBValue(toRGBDecimal(hue, saturation, value, 1)),
      alpha: asRGBValue(alpha)
    }
  }

  function toRGBDecimal(hue: number, saturation: number, value: number, mod: 5 | 3 | 1) {
    const k = (mod + hue / 60) % 6;
    return value - value * saturation * Math.max(Math.min(k, 4 - k, 1), 0);
  }

  function asRGBValue(rgb: number) {
    return Math.min(Math.max(Math.round(rgb * 255), 0), 255);
  }


}

export default RGBColor;
