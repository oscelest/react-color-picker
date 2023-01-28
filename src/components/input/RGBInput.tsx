import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {HTMLProps, useEffect, useState} from "react";
import {HSVColor, RGBColor} from "../../modules";
import Utility from "../../modules/Utility";
import Style from "./RGBInput.module.css";

export function RGBInput(props: RGBInputProps) {
  const {color, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const classes = [Style.Component, "color-picker-input"];
  if (className) classes.push(className);
  
  const [rgb, setRGB] = useState<RGBColor.Definition>(color);
  
  useEffect(() => setRGB(color), [color]);
  
  return (
    <div {...component_props} className={classes.join(" ")}>
      <InputField className={"color-picker-input rgba-red"} type={InputFieldType.TEL} label={"Red"} value={rgb.red} filter={Utility.number_filter} onChange={onRedChange}/>
      <InputField className={"color-picker-input rgba-green"} type={InputFieldType.TEL} label={"Green"} value={rgb.green} filter={Utility.number_filter} onChange={onBlueChange}/>
      <InputField className={"color-picker-input rgba-blue"} type={InputFieldType.TEL} label={"Blue"} value={rgb.blue} filter={Utility.number_filter} onChange={onGreenChange}/>
      <InputField className={"color-picker-input rgba-alpha"} type={InputFieldType.TEL} label={"Alpha"} value={rgb.alpha} filter={Utility.number_filter} onChange={onAlphaChange}/>
    </div>
  );
  
  function onRedChange(event: InputFieldChangeEvent) {
    updateColor({...rgb, red: Utility.parseRGB(event.value)});
  }
  
  function onBlueChange(event: InputFieldChangeEvent) {
    updateColor({...rgb, blue: Utility.parseRGB(event.value)});
  }
  
  function onGreenChange(event: InputFieldChangeEvent) {
    updateColor({...rgb, green: Utility.parseRGB(event.value)});
  }
  
  function onAlphaChange(event: InputFieldChangeEvent) {
    updateColor({...rgb, alpha: Utility.parseAlpha(event.value)});
  }
  
  function updateColor(color: RGBColor.Definition) {
    setRGB(color);
    onChange(RGBColor.toHSV(color));
  }
}

export interface RGBInputProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: RGBColor.Definition;
  onChange(color: HSVColor.Definition): void;
}
