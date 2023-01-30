import {HexColor, HSVColor} from "@noxy/color";
import {Range} from "@noxy/react-range";
import React, {useEffect, useState} from "react";
import Style from "./ColorPicker.module.css";
import {ColorPickerInput} from "./ColorPickerInput";
import {ColorPickerPreview} from "./ColorPickerPreview";
import {ColorPickerWindow} from "./index";

export function ColorPicker(props: ColorPickerProps) {
  const {style = {}, value = "#facadeff", children, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const current_value = new HexColor(HexColor.sanitize(value));
  
  const [hex, setHex] = useState<HexColor>(current_value);
  const [color, setColor] = useState<HSVColor>(hex.toHSV());
  
  const classes = [Style.Component, "color-picker"];
  if (className) classes.push(className);
  
  const {red, green, blue} = hex.toRGB();
  style["--range-alpha-background"] = `${red}, ${green}, ${blue}`;
  
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
      <div className={"color-picker-control"}>
        <Range className={"color-picker-range-hue"} vertical={true} value={color.hue} min={0} max={360} onChange={onHueChange}/>
        <Range className={"color-picker-range-alpha"} vertical={true} value={color.alpha} min={0} max={1} onChange={onAlphaChange}/>
      </div>
      <ColorPickerWindow hue={color.hue} x={color.saturation * 100} y={100 - color.value * 100} onChange={onWindowChange}/>
      <ColorPickerPreview color={hex}/>
      <ColorPickerInput color={color} onChange={updateColor}/>
    </div>
  );
  
  function onHueChange(hue: number) {
    updateColor(new HSVColor(hue, color.saturation, color.value, color.alpha));
  }
  
  function onAlphaChange(alpha: number) {
    updateColor(new HSVColor(color.hue, color.saturation, color.value, alpha));
  }
  
  function onWindowChange(x: number, y: number) {
    updateColor(new HSVColor(color.hue, x / 100, 1 - y / 100, color.alpha));
  }
  
  function updateColor(color: HSVColor) {
    const hex = color.toHex();
    
    setColor(color);
    setHex(hex);
    props.onChange?.(hex.toString());
  }
}

type ColorPickerStyleProps = React.CSSProperties & {"--range-alpha-background"?: string}

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children" | "style"> {
  value?: string;
  style?: ColorPickerStyleProps;
  children?: never;
  onChange?(hex?: string): void;
}
