module RGBColor {

  export function toHex(red: number, green: number, blue: number, alpha: number) {
    return `#${asHexValue(red)}${asHexValue(green)}${asHexValue(blue)}${asHexValue(alpha)}`;
  }

  function asHexValue(value: number, padding: string = "0", length: number = 2) {
    return Math.round(value).toString(16).padStart(length, padding);
  }

  export function toHSV(red: number, green: number, blue: number, alpha: number) {
    red /= 255;
    green /= 255;
    blue /= 255;
    alpha /= 100;

    const value = getValueHSX(red, blue, green);
    const chroma = getChromaHSX(red, blue, green, value);
    return {
      hue: getHueHSX(red, green, blue, value, chroma),
      saturation: getSaturationHSV(value, chroma),
      value,
      alpha
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
}

export default RGBColor;
