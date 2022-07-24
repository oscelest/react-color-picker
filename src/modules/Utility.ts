module Utility {

  export const hex_filter = /^#?[a-f\d]{0,8}$/i;
  export const number_filter = /^\d*$/;

  export function getFullHex(hex: string = "") {
    const offset = hex[0] === "#" ? 1 : 0;
    return hex.padEnd(6 + offset, "0").padEnd(8 + offset, "f").padStart(9, "#");
  }

  export function parseRGB(rgb: string) {
    return Math.min(Math.max(parseInt(rgb) || 0, 0), 255);
  }

  export function parseAlpha(alpha: string) {
    return Math.min(Math.max(parseInt(alpha) || 0, 0), 100);
  }

  export function parseHue(input: string) {
    return Math.min(Math.max(parseInt(input) || 0, 0), 360);
  }

  export function parseSVLA(value: string) {
    return Math.min(Math.max(parseInt(value) || 0, 0), 100) / 100;
  }

  export function resolveValue(prop: number, current: string) {
    const next = prop.toFixed(0);
    const prev = (parseInt(current) || 0).toFixed(0);
    return next === prev ? current : next;
  }

}

export default Utility;




