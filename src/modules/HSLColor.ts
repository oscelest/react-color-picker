import HSVColor from "./HSVColor";

export module HSLColor {
  
  export interface Definition {
    hue: number;
    saturation: number;
    lightness: number;
    alpha: number;
  }
  
  export function toHSV({hue, saturation, lightness, alpha}: HSLColor.Definition): HSVColor.Definition {
    validateHSL(hue, saturation, lightness, alpha);
    
    const value = getValueHSV(saturation, lightness);
    saturation = getSaturationHSV(value, lightness);
    
    return {hue, saturation, value, alpha};
  }
  
  function validateHSL(h: number, s: number, l: number, a: number) {
    if (h < 0 || h > 360) throw new Error(`Hue (${h}) must be a number between 0 and 360`);
    if (s < 0 || s > 1) throw new Error(`Saturation (${s}) must be a number between 0 and 1`);
    if (l < 0 || l > 1) throw new Error(`Lightness (${l}) must be a number between 0 and 1`);
    if (a < 0 || a > 1) throw new Error(`Alpha (${a}) must be a number between 0 and 1`);
  }
  
  function getValueHSV(saturation: number, lightness: number) {
    return lightness + saturation * Math.min(lightness, 1 - lightness);
  }
  
  function getSaturationHSV(value: number, lightness: number) {
    if (value === 0) return 0;
    return 2 * (1 - lightness / value);
  }
  
}

export default HSLColor;
