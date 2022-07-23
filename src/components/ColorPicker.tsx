import React, {useState} from "react";
import {InputField} from "@noxy/react-input-field";
import {Range} from "@noxy/react-range";
import {fromHex2HSVA, fromHSVA2Hex, sanitizeHex, getFullHex} from "../Utility";
import HSVAInput from "./HSVAInput";
import HexInput from "./HexInput";
import HSLAInput from "./HSLAInput";
import RGBAInput from "./RGBAInput";
import ColorPickerType from "../enums/ColorPickerType";
import ColorPickerWindow from "./ColorPickerWindow";
import Style from "./ColorPicker.module.css";

function ColorPicker(props: ColorPickerProps) {
  const [type, setType] = useState<number>(0);

  const classes = [Style.Component, "color-picker"];
  if (props.className) classes.push(props.className);

  const {hex, hue = 180, saturation = 100, value = 100, alpha = 100} = fromHex2HSVA(props.color);
  const preview_color: React.CSSProperties = {background: getFullHex(sanitizeHex(hex))};

  return (
    <div className={classes.join(" ")}>
      <div className={"color-picker-control"}>
        <Range vertical={true} value={hue} min={0} max={360} onChange={onHueChange}/>
        <Range vertical={true} value={alpha} min={0} max={100} onChange={onAlphaChange}/>
      </div>
      <ColorPickerWindow hue={hue} x={saturation} y={100 - value} onChange={onWindowChange}/>
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
          <RGBAInput hex={props.color} onChange={onChange}/>
        );
      case 2:
        return (
          <HSVAInput hex={props.color} onChange={onChange}/>
        );
      case 3:
        return (
          <HSLAInput hex={props.color} onChange={onChange}/>
        );
      default:
        return (
          <HexInput hex={props.color} onChange={onChange}/>
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
    console.log(hue, saturation, value, fromHSVA2Hex(hue, saturation, value, alpha));
    props.onChange?.(fromHSVA2Hex(hue, saturation, value, alpha));
  }

  function onAlphaChange(alpha: number) {
    props.onChange?.(fromHSVA2Hex(hue, saturation, value, alpha));
  }

  function onWindowChange(x: number, y: number) {
    console.log(x, y);
    props.onChange?.(fromHSVA2Hex(hue, x, 100 - y, alpha));
  }

  function onChange(hex?: string) {
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
