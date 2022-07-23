import React, {useState, useEffect} from "react";
import {InputField} from "@noxy/react-input-field";
import {Range} from "@noxy/react-range";
import {sanitizeHex, getFullHex} from "../Utility";
import HSVAInput from "./HSVAInput";
import HexInput from "./HexInput";
import HSLAInput from "./HSLAInput";
import RGBAInput from "./RGBAInput";
import ColorPickerType from "../enums/ColorPickerType";
import ColorPickerWindow from "./ColorPickerWindow";
import Style from "./ColorPicker.module.css";
import HSVColor from "../modules/HSVColor";
import HexColor from "../modules/HexColor";

function ColorPicker(props: ColorPickerProps) {
  const [type, setType] = useState<number>(0);
  const [hue, setHue] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(0);
  const [value, setValue] = useState<number>(0);
  const [alpha, setAlpha] = useState<number>(0);
  const [previous_hex, setPreviousHex] = useState<string>();

  useEffect(
    () => {
      if (!props.color || previous_hex === props.color) return;
      const {hue, saturation, value, alpha, hex} = HexColor.toHSV(props.color);
      setHue(hue);
      setSaturation(saturation);
      setValue(value);
      setAlpha(alpha);
      setPreviousHex(hex);
    },
    [props.color]
  );

  const hex = previous_hex ?? props.color;
  const classes = [Style.Component, "color-picker"];
  if (props.className) classes.push(props.className);

  const preview_color: React.CSSProperties = {background: getFullHex(sanitizeHex(props.color))};

  return (
    <div className={classes.join(" ")}>
      <div className={"color-picker-control"}>
        <Range vertical={true} value={hue} min={0} max={360} onChange={onHueChange}/>
        <Range vertical={true} value={alpha * 100} min={0} max={100} onChange={onAlphaChange}/>
      </div>
      <ColorPickerWindow hue={hue} x={saturation * 100} y={100 - value * 100} onChange={onWindowChange}/>
      <div className={"color-picker-preview"} style={preview_color}/>
      <div className={"color-picker-info"}>
        <InputField label={"Type"} max={3} caret={true} input={ColorPickerType[type]} onCommit={onTypeCommit}>
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
      case 1:
        return (
          <RGBAInput hex={hex} onChange={onChange}/>
        );
      case 2:
        return (
          <HSVAInput hex={hex} onChange={onChange}/>
        );
      case 3:
        return (
          <HSLAInput hex={hex} onChange={onChange}/>
        );
      default:
        return (
          <HexInput hex={hex} onChange={onChange}/>
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
    setHue(hue);
    updateColor(HSVColor.toHex(hue, saturation, value, alpha));
  }

  function onAlphaChange(alpha: number) {
    alpha /= 100;
    setAlpha(alpha);
    updateColor(HSVColor.toHex(hue, saturation, value, alpha));
  }

  function onWindowChange(x: number, y: number) {
    const saturation = x / 100;
    const value = 1 - y / 100;
    setSaturation(saturation);
    setValue(value);
    updateColor(HSVColor.toHex(hue, saturation, value, alpha));
  }

  function onChange(hex: string) {
    const {hue, saturation, value, alpha} = HexColor.toHSV(hex);
    setHue(hue);
    setSaturation(saturation);
    setValue(value);
    setAlpha(alpha);
    updateColor(hex);
  }

  function updateColor(hex: string) {
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
