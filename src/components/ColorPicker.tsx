import {Range} from "@noxy/react-range";
import React, {useEffect, useState} from "react";
import {HexColor, HSVColor} from "../modules";
import Style from "./ColorPicker.module.css";
import {ColorPickerInput} from "./ColorPickerInput";
import {ColorPickerPreview} from "./ColorPickerPreview";
import {ColorPickerWindow} from "./index";

export function ColorPicker(props: ColorPickerProps) {
  const {style = {}, value, children, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const [hex, setHex] = useState<string>("#facadeff");
  const [color, setColor] = useState<HSVColor.Definition>(HexColor.toHSV(hex));

  const classes = [Style.Component, "color-picker"];
  if (className) classes.push(className);
  
  const {red, green, blue} = HexColor.toRGB(hex);
  style["--range-alpha-background"] = `${red}, ${green}, ${blue}`;
  
  useEffect(
    () => {
      if (!value || hex === value) return;
      setColor(HexColor.toHSV(value));
      setHex(value);
    },
    [value]
  );
  
  return (
    <div {...component_props} className={classes.join(" ")} style={style}>
      <div className={"color-picker-control"}>
        <Range className={"color-picker-range-hue"} vertical={true} value={color.hue} min={0} max={360} onChange={onHueChange}/>
        <Range className={"color-picker-range-alpha"} vertical={true} value={color.alpha * 100} min={0} max={100} onChange={onAlphaChange}/>
      </div>
      <ColorPickerWindow hue={color.hue} x={color.saturation * 100} y={100 - color.value * 100} onChange={onWindowChange}/>
      <ColorPickerPreview color={hex}/>
      <ColorPickerInput color={color} onChange={updateColor}/>
    </div>
  );
  
  function onHueChange(hue: number) {
    updateColor({...color, hue});
  }
  
  function onAlphaChange(alpha: number) {
    updateColor({...color, alpha: alpha / 100});
  }
  
  function onWindowChange(x: number, y: number) {
    updateColor({...color, saturation: x / 100, value: 1 - y / 100});
  }
  
  function updateColor(color: HSVColor.Definition) {
    const hex = HSVColor.toHex(color);
    
    setColor(color);
    setHex(hex);
    props.onChange?.(hex);
  }
}

type ColorPickerStyleProps = React.CSSProperties & {"--range-alpha-background"?: string}

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children" | "style"> {
  value?: string;
  style?: ColorPickerStyleProps;
  children?: never;
  onChange?(hex?: string): void;
}
