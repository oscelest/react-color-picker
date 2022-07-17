import RGBAColor from "./RGBAColor";
import HSLAColor from "./HSLAColor";

export default class HSVAColor {

  public hue: number;
  public saturation: number;
  public value: number;
  public alpha: number;

  constructor(hue?: number, saturation?: number, value?: number, alpha?: number) {
    this.hue = Math.max(0, Math.min(360, hue ?? 0));
    this.saturation = Math.max(0, Math.min(1, saturation ?? 1));
    this.value = Math.max(0, Math.min(1, value ?? 1));
    this.alpha = Math.max(0, Math.min(100, alpha ?? 100));
  }

  public toString() {
    return `hsva(${this.hue}deg ${this.saturation}% ${this.value}% / ${this.alpha}%)`;
  }

  public toHex() {
    return this.toRGBA().toHex();
  }

  public toHSLA() {
    return new HSLAColor();
  }

  public toHSVA() {
    return new HSLAColor(this.hue, this.getSaturationHSL(), this.getLightnessHSL());
  }

  public getSaturationHSL() {
    const lightness = this.getLightnessHSL();
    const min = Math.min(lightness, 1 - lightness);
    if (!min) return 0;
    return (this.value - lightness) / min;
  }

  public getLightnessHSL() {
    return this.value - this.value * this.saturation / 2;
  }

  public toRGBA() {
    return new RGBAColor(this.toRGBAHelper(5), this.toRGBAHelper(3), this.toRGBAHelper(1), this.alpha);
  }

  private toRGBAHelper(n: number) {
    const k = (n + this.hue / 60) % 6;
    return Math.round((this.value - this.value * this.saturation * Math.max(0, Math.min(k, 4 - k, 1))) * 255);
  }

  public getHueColor() {
    return new HSVAColor(this.hue, 1, 1, 100);
  }
}
