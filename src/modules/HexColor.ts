import HSVColor from "./HSVColor";
import RGBColor from "./RGBColor";

export module HexColor {
  
  export type Definition = string
  
  export function toRGB(hex: HexColor.Definition): RGBColor.Definition {
    return {
      red: getRedInt(hex),
      green: getGreenInt(hex),
      blue: getBlueInt(hex),
      alpha: Math.round(getAlphaInt(hex) / 2.55)
    };
  }
  
  export function toHSV(hex: HexColor.Definition): HSVColor.Definition {
    return RGBColor.toHSV(toRGB(hex));
  }
  
  function getRedInt(hex: HexColor.Definition): number {
    return parseInt(hex.slice(-8, -6), 16);
  }
  
  function getGreenInt(hex: HexColor.Definition): number {
    return parseInt(hex.slice(-6, -4), 16);
  }
  
  function getBlueInt(hex: HexColor.Definition): number {
    return parseInt(hex.slice(-4, -2), 16);
  }
  
  function getAlphaInt(hex: HexColor.Definition): number {
    return parseInt(hex.slice(-2), 16);
  }
}

export default HexColor;
