export module Utility {
  
  export const color_type_list: string[] = ["Hex", "RGB", "HSV", "HSL"];
  export const hex_filter: RegExp = /^#?[a-f\d]{0,8}$/i;
  export const number_filter: RegExp = /^\d{0,3}$/;
  
  export function getFullHex(hex: string = ""): string {
    const offset: number = hex[0] === "#" ? 1 : 0;
    return hex.padEnd(6 + offset, "0").padEnd(8 + offset, "f").padStart(9, "#").toLowerCase();
  }
  
  export function toIntString(value: number): string {
    return value.toFixed(0);
  }
  
  export function toPercentageString(value: number): string {
    return (value * 100).toFixed(0);
  }
  
  export function parseRGB(rgb: string): number {
    return Math.min(Math.max(parseInt(rgb) || 0, 0), 255);
  }
  
  export function parseAlpha(alpha: string): number {
    return Math.min(Math.max(parseInt(alpha) || 0, 0), 100);
  }
  
  export function parseHue(input: string): number {
    return Math.min(Math.max(parseInt(input) || 0, 0), 360);
  }
  
  // Convert a Saturation, Value, or Lightness int (1-100) to decimal (0-1)
  export function parseSVL(value: string): number {
    return Math.min(Math.max(parseInt(value) || 0, 0), 100) / 100;
  }
}

export default Utility;




