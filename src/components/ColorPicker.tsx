import React, {useState} from "react";
import {InputField} from "@noxy/react-input-field";
import RGBAColor from "../classes/RGBAColor";
import HSLAColor from "../classes/HSLAColor";
import HSVAColor from "../classes/HSVAColor";
import HexColor from "../classes/HexColor";
import {getHueHSX, getHexColors} from "../Utility";
import HSLAInput from "./HSLAInput";
import HSVAInput from "./HSVAInput";

const Style = require("./ColorPicker.module.css");
const type_map = {
  Hex: HexColor,
  RGB: RGBAColor,
  HSV: HSVAColor,
  HSL: HSLAColor
};

function ColorPicker(props: ColorPickerProps) {
  const [cursor_point, setCursorPoint] = useState();

  const classes = [Style.Component, "color-picker"];
  if (props.className) classes.push(props.className);

  const {hex, red, blue, green} = getHexColors(props.color);
  const preview_color: React.CSSProperties = {background: hex};

  const value = Math.max(red, green, blue);
  const chroma = value - Math.min(red, green, blue);
  const hue = getHueHSX(red, green, blue, value, chroma);
  const window_color: React.CSSProperties = {background: `hsla(${hue}, 100%, 50%, 100%)`};

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
        <InputField label={"Type"} max={3} onCommit={onTypeCommit}>
          {Object.keys(type_map).map((type, index) => <span key={index}>{type}</span>)}
        </InputField>
        {renderInfo()}
      </div>
    </div>
  );

  function onTypeCommit(input: string, index: number) {
    // const type = Object.values(type_map)[index];
    // if (!type || !color_ref.current) return setColor(color);

    // if (type instanceof RGBAColor) {
    //   if (color_ref.current instanceof RGBAColor) return;
    //   return setColor(color_ref.current.toRGBA());
    // }
    // if (type instanceof HSVAColor) {
    //   if (color_ref.current instanceof HSVAColor) return;
    //   return setColor(color_ref.current.toHSVA());
    // }
  }

  function renderInfo() {
    return (
      // <HSLAInput hex={hex} onChange={onChange}/>
      <HSVAInput hex={hex} onChange={onChange}/>
      // <HexInput hex={props.color} onChange={onChange}/>
    );
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
