import React, {useState} from "react";
import {InputField} from "@noxy/react-input-field";
import {getHueHSX, fromHex2HSXRGB} from "../Utility";
import HSVAInput from "./HSVAInput";
import HexInput from "./HexInput";
import HSLAInput from "./HSLAInput";
import RGBAInput from "./RGBAInput";
import ColorPickerType from "../enums/ColorPickerType";

const Style = require("./ColorPicker.module.css");

function ColorPicker(props: ColorPickerProps) {
  const [cursor_point, setCursorPoint] = useState();
  const [type, setType] = useState<number>(0);

  const classes = [Style.Component, "color-picker"];
  if (props.className) classes.push(props.className);

  const {hex, red, blue, green} = fromHex2HSXRGB(props.color);
  const preview_color: React.CSSProperties = {background: hex};
  const window_color: React.CSSProperties = {background: `hsla(${getHueHSX(red, green, blue)}, 100%, 50%, 100%)`};

  return (
    <div className={classes.join(" ")}>
      <div className={"color-picker-control"}>
        <div className={"color-picker-control-value"}>
          <div className={"color-picker-control-cursor"}></div>
        </div>
        <div className={"color-picker-control-alpha"}>
          <div className={"color-picker-control-cursor"}></div>
        </div>
      </div>
      <div className={"color-picker-window"} style={window_color}>
        <div className={"color-picker-window-cursor"}/>
      </div>
      <div className={"color-picker-preview"} style={preview_color}/>
      <div className={"color-picker-info"}>
        <InputField label={"Type"} max={3} caret={true} input={ColorPickerType[type]} onCommit={onTypeCommit}>
          <span>{"Hex"}</span>
          <span>{"RGB"}</span>
          <span>{"HSV"}</span>
          <span>{"HSL"}</span>
        </InputField>
        {renderInfo()}
      </div>
    </div>
  );

  function onTypeCommit(input: string, index: number) {
    if (index > -1) {
      setType(index);
      return {input, index};
    }
    return {input: ColorPickerType[type], index: type};
  }

  function renderInfo() {
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

  function onChange(hex?: string) {
    console.log(hex);
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
