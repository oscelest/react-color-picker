import HexColor from "./HexColor";
import HSLColor from "./HSLColor";
import RGBColor from "./RGBColor";

export module HSVColor {
  
  export interface Definition {
    hue: number;
    saturation: number;
    value: number;
    alpha: number;
  }
  
  export function toHex(color: HSVColor.Definition): HexColor.Definition {
    return RGBColor.toHex(toRGB(color));
  }
  
  export function toRGB({hue, value, alpha, saturation}: HSVColor.Definition): RGBColor.Definition {
    return {
      red: asRGBValue(toRGBDecimal(hue, saturation, value, 5)),
      green: asRGBValue(toRGBDecimal(hue, saturation, value, 3)),
      blue: asRGBValue(toRGBDecimal(hue, saturation, value, 1)),
      alpha: asAlphaValue(alpha)
    };
  }
  
  export function toHSL({hue, value, alpha, saturation}: HSVColor.Definition): HSLColor.Definition {
    const lightness = getLightnessHSL(saturation, value);
    saturation = getSaturationHSL(lightness, value);
    
    return {hue, saturation, lightness, alpha};
  }
  
  function toRGBDecimal(h: number, s: number, v: number, m: 5 | 3 | 1): number {
    const k = (m + h / 60) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  }
  
  function asRGBValue(rgb: number): number {
    return Math.min(Math.max(Math.round(rgb * 255), 0), 255);
  }
  
  function asAlphaValue(rgb: number): number {
    return Math.min(Math.max(Math.round(rgb * 100), 0), 100);
  }
  
  function getLightnessHSL(saturation: number, value: number): number {
    return value * (1 - saturation / 2);
  }
  
  function getSaturationHSL(lightness: number, value: number): number {
    if (lightness === 0 || lightness === 1) return 0;
    return (value - lightness) / Math.min(lightness, 1 - lightness);
  }
}

export default HSVColor;
