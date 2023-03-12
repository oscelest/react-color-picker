import {HSVColor} from "@noxy/color";
import {Range} from "@noxy/react-range";
import React, {CSSProperties, HTMLProps} from "react";
import Style from "./ColorPickerControl.module.css";

export function ColorPickerControl(props: ColorPickerControlProps) {
  const {color, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const classes = [Style.Component, "color-picker-control"];
  if (className) classes.push(className);
  
  const {red, green, blue} = color.toRGB();
  const rgb = `${red.toFixed(0)}, ${green.toFixed(0)}, ${blue.toFixed(0)}`;
  const style: CSSProperties = {background: `linear-gradient(to top, rgba(${rgb}, 0) 0%, rgba(${rgb}, 1) 100%)`};
  
  console.log(color.hue);
  
  return (
    <div {...component_props} className={classes.join(" ")}>
      <Range className={"color-picker-range-hue"} vertical={true} value={color.hue} min={0} max={360} onChange={onHueChange}/>
      <Range className={"color-picker-range-alpha"} style={style} vertical={true} value={color.alpha} min={0} max={1} onChange={onAlphaChange}/>
    </div>
  );
  
  function onHueChange(hue: number) {
    onChange(new HSVColor(hue, color.saturation, color.value, color.alpha));
  }
  
  function onAlphaChange(alpha: number) {
    onChange(new HSVColor(color.hue, color.saturation, color.value, alpha));
  }
  
}

export interface ColorPickerControlProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: HSVColor;
  children?: never;
  onChange(color: HSVColor): void;
}
