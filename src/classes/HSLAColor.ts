import RGBAColor from "./RGBAColor";
import HSVAColor from "./HSVAColor";

export default class HSLAColor {

  public hue: number;
  public saturation: number;
  public lightness: number;
  public alpha: number;

  constructor(hue?: number, saturation?: number, level?: number, alpha?: number) {
    this.hue = Math.max(0, Math.min(360, hue ?? 0));
    this.saturation = Math.max(0, Math.min(1, saturation ?? 1));
    this.lightness = Math.max(0, Math.min(1, level ?? 1));
    this.alpha = Math.max(0, Math.min(100, alpha ?? 100));
  }

  public toString() {
    return `hsva(${this.hue}deg ${this.saturation}% ${this.lightness}% / ${this.alpha}%)`;
  }

  public toHex() {
    return this.toRGBA().toHex();
  }

  public toHSVA() {
    return new HSVAColor(this.hue, this.getSaturationHSV(), this.getValueHSV());
  }

  public getSaturationHSV() {
    const value = this.getValueHSV();
    if (!value) return 0;
    return 2 - 2 * this.lightness / value;
  }

  public getValueHSV() {
    return this.saturation * Math.min(this.lightness, 1 - this.lightness) + this.lightness;
  }

  public toRGBA() {
    return new RGBAColor(this.toRGBAHelper(0), this.toRGBAHelper(8), this.toRGBAHelper(4), this.alpha);
  }

  private toRGBAHelper(n: number) {
    const k = (n + this.hue / 30) % 12;
    const a = this.lightness - this.saturation * Math.min(this.lightness, 1 - this.lightness);
    const d = Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(a * d * 255);
  }

  public getHueColor() {
    return new HSLAColor(this.hue, 1, 0.5, 100);
  }
}
