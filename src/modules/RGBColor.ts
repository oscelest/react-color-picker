import HexColor from "./HexColor";
import HSVColor from "./HSVColor";

export module RGBColor {
  
  export interface Definition {
    red: number;
    green: number;
    blue: number;
    alpha: number;
  }
  
  export function toHex({red, green, blue, alpha}: RGBColor.Definition): HexColor.Definition {
    return `#${asHexValue(red)}${asHexValue(green)}${asHexValue(blue)}${asHexValue(alpha * 2.55)}`;
  }
  
  export function toHSV({red, green, blue, alpha}: RGBColor.Definition): HSVColor.Definition {
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
  
  function asHexValue(value: number, padding: string = "0", length: number = 2): string {
    return Math.round(value).toString(16).padStart(length, padding);
  }
  
  function getValueHSX(red: number, green: number, blue: number): number {
    return Math.max(red, green, blue);
  }
  
  function getChromaHSX(red: number, green: number, blue: number, value: number): number {
    return value - Math.min(red, green, blue);
  }
  
  function getHueHSX(red: number, green: number, blue: number, value, chroma: number): number {
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
  
  function getSaturationHSV(value: number, chroma: number) {
    return value !== 0 ? chroma / value : 0;
  }
}

export default RGBColor;
