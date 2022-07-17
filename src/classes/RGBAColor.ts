import HSLAColor from "./HSLAColor";
import HSVAColor from "./HSVAColor";
import HexColor from "./HexColor";

export default class RGBAColor {

  public red: number;
  public green: number;
  public blue: number;
  public alpha: number;

  constructor(red?: number, green?: number, blue?: number, alpha?: number) {
    this.red = Math.max(0, Math.min(255, red ?? 0));
    this.green = Math.max(0, Math.min(255, green ?? 0));
    this.blue = Math.max(0, Math.min(255, blue ?? 0));
    this.alpha = Math.max(0, Math.min(100, alpha ?? 100));
  }

  public toString() {
    return `rgba(${this.red} ${this.green} ${this.blue} / ${this.alpha}%)`;
  }

  public toHex() {
    return new HexColor("#FFFFFFFF");
  }

  public toHSVA() {
    const value = Math.max(this.red, this.green, this.blue);
    const chroma = value - Math.min(this.red, this.green, this.blue);
    return new HSVAColor(this.getHue(value, chroma), this.getSaturationHSV(value, chroma), value, this.alpha);
  }

  public toHSLA() {
    const value = Math.max(this.red, this.green, this.blue);
    const chroma = value - Math.min(this.red, this.green, this.blue);
    const lightness = value - chroma / 2;
    return new HSLAColor(this.getHue(value, chroma), this.getSaturationHSL(value, lightness), lightness, this.alpha);
  }

  public getHue(value: number, chroma: number) {
    if (chroma === 0) return 0;
    switch (value) {
      case this.red:
        return 60 * (this.green - this.blue) / chroma;
      case this.green:
        return 60 * (this.blue - this.red) / chroma;
      case this.blue:
        return 60 * (this.red - this.green) / chroma;
      default:
        throw new Error("Color does not exist.");
    }
  }

  public getSaturationHSV(value: number, chroma: number) {
    if (value === 0) return 0;
    return chroma / value;
  }

  public getSaturationHSL(value: number, lightness: number) {
    if (lightness === 0 || lightness === 1) return 0;
    return (value - lightness) / Math.min(lightness, 1 - lightness);
  }
}
