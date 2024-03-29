import {HexColor} from "@noxy/color";
import React, {HTMLProps} from "react";
import Style from "./ColorPickerPreview.module.css";

export function ColorPickerPreview(props: ColorPickerPreviewProps) {
  const {color, className, ...component_method_props} = props;
  const {...component_props} = component_method_props;
  
  const classes = [Style.Component, "color-picker-preview"];
  if (className) classes.push(className);
  
  const preview_color: React.CSSProperties = {background: color.toHexAString()};
  
  return (
    <div {...component_props} className={classes.join(" ")} style={preview_color}/>
  );
}

export interface ColorPickerPreviewProps extends Omit<HTMLProps<HTMLDivElement>, "color"> {
  color: HexColor;
  children?: never;
}
