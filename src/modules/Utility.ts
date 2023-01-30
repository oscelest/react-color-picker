export module Utility {
  
  export const color_type_list: string[] = ["Hex", "RGB", "HSV", "HSL", "HWB", "CMYK"];
  export const hex_filter: RegExp = /^#?[a-f\d]{0,8}$/i;
  export const number_filter: RegExp = /^\d{0,3}$/;
  
  export function toIntString(value: number): string {
    return value.toFixed(0);
  }
  
  export function toPercentageString(value: number): string {
    return (value * 100).toFixed(0);
  }
  
  export function parseRGB(rgb: string): number {
    return Math.min(Math.max(parseInt(rgb) || 0, 0), 255);
  }
  
  export function parseDegree(input: string): number {
    return Math.min(Math.max(parseInt(input) || 0, 0), 360);
  }
  
  // Convert a Saturation, Value, or Lightness int (1-100) to decimal (0-1)
  export function parseDecimal(value: string): number {
    return Math.min(Math.max(parseInt(value) || 0, 0), 100) / 100;
  }
}

export default Utility;




