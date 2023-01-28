import HSVColor from "./HSVColor";

export module HSLColor {
  
  export interface Definition {
    hue: number;
    saturation: number;
    lightness: number;
    alpha: number;
  }
  
  export function toHSV({hue, saturation, lightness, alpha}: HSLColor.Definition): HSVColor.Definition {
    const value: number = getValueHSV(saturation, lightness);
    saturation = getSaturationHSV(value, lightness);
    
    return {hue, saturation, value, alpha};
  }
  
  function getValueHSV(saturation: number, lightness: number): number {
    return lightness + saturation * Math.min(lightness, 1 - lightness);
  }
  
  function getSaturationHSV(value: number, lightness: number): number {
    if (value === 0) return 0;
    return 2 * (1 - lightness / value);
  }
  
}

export default HSLColor;
