import React, {useState, useEffect} from "react";
import {InputField} from "@noxy/react-input-field";
import {Range} from "@noxy/react-range";
import HSVAInput from "./HSVAInput";
import HexInput from "./HexInput";
import HSLAInput from "./HSLAInput";
import RGBAInput from "./RGBAInput";
import ColorPickerType from "../enums/ColorPickerType";
import ColorPickerWindow from "./ColorPickerWindow";
import Style from "./ColorPicker.module.css";
import HSVColor from "../modules/HSVColor";
import HexColor from "../modules/HexColor";
import RGBColor from "../modules/RGBColor";
import HSLColor from "../modules/HSLColor";

function ColorPicker(props: ColorPickerProps) {
  const [type, setType] = useState<number>(0);
  const [hue, setHue] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [alpha, setAlpha] = useState<number>(0);
  const [previous_hex, setPreviousHex] = useState<string>("#facadeff");

  useEffect(
    () => {
      if (!props.color || previous_hex === props.color) return;
      const {hue, saturation, value, alpha} = HexColor.toHSV(props.color);
      setHue(hue);
      setSaturation(saturation);
      setValue(value);
      setAlpha(alpha);
      setPreviousHex(props.color);
    },
    [props.color]
  );

  const hex = previous_hex ?? props.color;
  const classes = [Style.Component, "color-picker"];
  if (props.className) classes.push(props.className);

  const preview_color: React.CSSProperties = {background: props.color};

  return (
    <div className={classes.join(" ")}>
      <div className={"color-picker-control"}>
        <Range className={"color-picker-range-hue"} vertical={true} value={hue} min={0} max={360} onChange={onHueChange}/>
        <Range className={"color-picker-range-alpha"} vertical={true} value={alpha * 100} min={0} max={100} onChange={onAlphaChange}/>
      </div>
      <ColorPickerWindow hue={hue} x={saturation * 100} y={100 - value * 100} onChange={onWindowChange}/>
      <div className={"color-picker-preview"} style={preview_color}/>
      <div className={"color-picker-info"}>
        <InputField className={"color-picker-input color-picker-type"} label={"Type"} max={3} caret={true} input={ColorPickerType[type]} onCommit={onTypeCommit}>
          <span>{"Hex"}</span>
          <span>{"RGB"}</span>
          <span>{"HSV"}</span>
          <span>{"HSL"}</span>
        </InputField>
        {renderInput()}
      </div>
    </div>
  );

  function renderInput() {
    switch (type) {
      case 1: {
        // RGBA values are (0-255, 0-255, 0-255, 0-100)
        return (
          <RGBAInput {...HSVColor.toRGB(hue, saturation, value, alpha)} onChange={onRGBChange}/>
        );
      }
      case 2:
        // HSVA values are (0-360, 0-1, 0-1, 0-1)
        return (
          <HSVAInput {...{hue, saturation, value, alpha}} onChange={onHSVAChange}/>
        );
      case 3: {
        // HSLA values are (0-360, 0-1, 0-1, 0-1)
        return (
          <HSLAInput {...HSVColor.toHSL(hue, saturation, value, alpha)} onChange={onHSLAChange}/>
        );
      }
      default:
        // Hex value is (#0f0f0f0f)
        return (
          <HexInput hex={hex} onChange={onHexChange}/>
        );
    }
  }

  function onTypeCommit(input: string, index: number) {
    if (index > -1) {
      setType(index);
      return {input, index};
    }
    return {input: ColorPickerType[type], index: type};
  }

  function onHueChange(hue: number) {
    updateColor(hue, saturation, value, alpha);
  }

  function onAlphaChange(alpha: number) {
    updateColor(hue, saturation, value, alpha / 100);
  }

  function onWindowChange(x: number, y: number) {
    updateColor(hue, x / 100, 1 - y / 100, alpha);
  }

  // HSVA values are (0-360, 0-1, 0-1, 0-1)
  function onHSVAChange(hue: number, saturation: number, value: number, alpha: number) {
    updateColor(hue, saturation, value, alpha);
  }

  // HSLA values are (0-360, 0-1, 0-1, 0-1)
  function onHSLAChange(hue: number, saturation: number, lightness: number, alpha: number) {
    console.log(hue, saturation, lightness, alpha)
    const hsv = HSLColor.toHSV(hue, saturation, lightness, alpha);
    updateColor(hsv.hue, hsv.saturation, hsv.value, hsv.alpha);
  }

  // RGBA values are (0-255, 0-255, 0-255, 0-100)
  function onRGBChange(red: number, green: number, blue: number, alpha: number) {
    const hsv = RGBColor.toHSV(red, green, blue, alpha);
    updateColor(hsv.hue, hsv.saturation, hsv.value, hsv.alpha);
  }

  // Hex value is (#0f0f0f0f)
  function onHexChange(hex: string) {
    const hsv = HexColor.toHSV(hex);
    updateColor(hsv.hue, hsv.saturation, hsv.value, hsv.alpha);
  }

  function updateColor(hue: number, saturation: number, value: number, alpha: number) {
    const hex = HSVColor.toHex(hue, saturation, value, alpha);
    setHue(hue);
    setSaturation(saturation);
    setValue(value);
    setAlpha(alpha);
    setPreviousHex(hex);
    props.onChange?.(hex);
  }
}

export interface ColorPickerProps {
  className?: string;
  color?: string;

  children?: never;

  onChange?(hex?: string): void;
}

export default ColorPicker;
