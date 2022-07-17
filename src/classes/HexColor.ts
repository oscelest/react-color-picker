import RGBAColor from "./RGBAColor";

export default class HexColor {

  public red: number;
  public green: number;
  public blue: number;
  public alpha: number;

  constructor(hex: string = "") {
    const [red = 0, green = 0, blue = 0, alpha = 255] = hex.replace(/[^a-f\d]/i, "").padStart(6, "0").padEnd(6, "f").match(/.{2}/g)?.map(v => parseInt(v, 16)) ?? [];
    this.red = Math.max(0, Math.min(255, red));
    this.green = Math.max(0, Math.min(255, green));
    this.blue = Math.max(0, Math.min(255, blue));
    this.alpha = Math.max(0, Math.min(255, alpha));
  }

  public toString() {
    return `#${HexColor.toHexValue(this.red)}${HexColor.toHexValue(this.green)}${HexColor.toHexValue(this.blue)}${HexColor.toHexValue(Math.round(this.alpha * 2.55), "f")}`;
  }

  public static toHexValue(value: number, padding: string = "0", length: number = 2) {
    return value.toString(16).padStart(length, padding);
  }

  public toRGBA() {
    return new RGBAColor(this.red, this.green, this.blue, Math.round(this.alpha / 255 * 100));
  }

  public toHSVA() {
    return this.toRGBA().toHSVA();
  }

  public toHSLA() {
    return this.toRGBA().toHSLA();
  }
}
