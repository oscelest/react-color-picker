import RGBColor from "./RGBColor";

export module HexColor {

  export function validateHex(hex?: string) {
    if (!hex?.match(/#[a-f\d]{8}/i)) throw new Error("Hex must be of the form '/#[a-f\\d]{8}/'.");
  }

  export function getRedInt(hex: string) {
    return parseInt(hex.slice(-8, -6), 16);
  }

  export function getGreenInt(hex: string) {
    return parseInt(hex.slice(-6, -4), 16);
  }

  export function getBlueInt(hex: string) {
    return parseInt(hex.slice(-4, -2), 16);
  }

  export function getAlphaInt(hex: string) {
    return parseInt(hex.slice(-2), 16);
  }

  export function toRGBA(hex: string) {
    validateHex(hex);

    return {
      red: getRedInt(hex),
      green: getGreenInt(hex),
      blue: getBlueInt(hex),
      alpha: Math.round(getAlphaInt(hex) / 2.55)
    };
  }

  export function toHSVA(hex: string) {
    const {red, green, blue, alpha} = toRGBA(hex);
    return RGBColor.toHSVA(red, green, blue, alpha);
  }
}

export default HexColor;
