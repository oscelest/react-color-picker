import {HexColor, HSVColor} from "@noxy/color";
import React, {HTMLProps, useEffect, useState} from "react";
import Style from "./ColorPicker.module.css";
import {ColorPickerControl} from "./ColorPickerControl";
import {ColorPickerInput} from "./ColorPickerInput";
import {ColorPickerPreview} from "./ColorPickerPreview";
import {ColorPickerWindow} from "./ColorPickerWindow";

export function ColorPicker(props: ColorPickerProps) {
  const {style = {}, value = "#facadeff", children, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const current_value = new HexColor(HexColor.sanitize(value));
  
  const [hex, setHex] = useState<HexColor>(current_value);
  const [color, setColor] = useState<HSVColor>(hex.toHSV());
  
  const classes = [Style.Component, "color-picker"];
  if (className) classes.push(className);
  
  useEffect(
    () => {
      if (hex.equalTo(current_value)) return;
      setColor(current_value.toHSV());
      setHex(current_value);
    },
    [value]
  );
  
  return (
    <div {...component_props} className={classes.join(" ")} style={style}>
      <ColorPickerControl color={color} onChange={updateColor}/>
      <ColorPickerWindow color={color} onChange={updateColor}/>
      <ColorPickerPreview color={hex}/>
      <ColorPickerInput color={color} onChange={updateColor}/>
    </div>
  );
  
  function updateColor(color: HSVColor) {
    const hex = color.toHex();
    
    setColor(color);
    setHex(hex);
    props.onChange?.(hex.toString());
  }
}

export interface ColorPickerProps extends Omit<HTMLProps<HTMLDivElement>, "onChange"> {
  value?: string;
  children?: never;
  onChange?(hex?: string): void;
}
