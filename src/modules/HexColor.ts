import HSVColor from "./HSVColor";
import RGBColor from "./RGBColor";

export module HexColor {
  
  export function toRGBA(hex: string): RGBColor.Definition {
    validateHex(hex);
    
    return {
      red: getRedInt(hex),
      green: getGreenInt(hex),
      blue: getBlueInt(hex),
      alpha: Math.round(getAlphaInt(hex) / 2.55)
    };
  }
  
  export function toHSVA(hex: string): HSVColor.Definition {
    return RGBColor.toHSVA(toRGBA(hex));
  }
  
  function validateHex(hex?: string) {
    if (!hex?.match(/#[a-f\d]{8}/i)) throw new Error("Hex must be of the form '/#[a-f\\d]{8}/'.");
  }
  
  function getRedInt(hex: string) {
    return parseInt(hex.slice(-8, -6), 16);
  }
  
  function getGreenInt(hex: string) {
    return parseInt(hex.slice(-6, -4), 16);
  }
  
  function getBlueInt(hex: string) {
    return parseInt(hex.slice(-4, -2), 16);
  }
  
  function getAlphaInt(hex: string) {
    return parseInt(hex.slice(-2), 16);
  }
}

export default HexColor;
