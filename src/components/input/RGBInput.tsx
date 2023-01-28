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
  
  const [red, setRed] = useState<string>(Utility.toIntString(color.red));
  const [green, setGreen] = useState<string>(Utility.toIntString(color.green));
  const [blue, setBlue] = useState<string>(Utility.toIntString(color.blue));
  const [alpha, setAlpha] = useState<string>(Utility.toIntString(color.alpha));
  
  useEffect(
    () => {
      if (color.red !== Utility.parseRGB(red)) setRed(Utility.toIntString(color.red));
      if (color.green !== Utility.parseRGB(green)) setGreen(Utility.toIntString(color.green));
      if (color.blue !== Utility.parseRGB(blue)) setBlue(Utility.toIntString(color.blue));
      if (color.alpha !== Utility.parseAlpha(alpha)) setAlpha(Utility.toIntString(color.alpha));
    },
    [color]
  );
  
  return (
    <div {...component_props} className={classes.join(" ")}>
      <InputField className={"color-picker-input rgba-red"} type={InputFieldType.TEL} label={"Red"} value={red} filter={Utility.number_filter} onChange={onRedChange}/>
      <InputField className={"color-picker-input rgba-green"} type={InputFieldType.TEL} label={"Green"} value={green} filter={Utility.number_filter} onChange={onBlueChange}/>
      <InputField className={"color-picker-input rgba-blue"} type={InputFieldType.TEL} label={"Blue"} value={blue} filter={Utility.number_filter} onChange={onGreenChange}/>
      <InputField className={"color-picker-input rgba-alpha"} type={InputFieldType.TEL} label={"Alpha"} value={alpha} filter={Utility.number_filter} onChange={onAlphaChange}/>
    </div>
  );
  
  function onRedChange(event: InputFieldChangeEvent) {
    setRed(event.value);
    onChange(RGBColor.toHSV({...color, red: Utility.parseRGB(event.value)}));
  }
  
  function onBlueChange(event: InputFieldChangeEvent) {
    setGreen(event.value);
    onChange(RGBColor.toHSV({...color, blue: Utility.parseRGB(event.value)}));
  }
  
  function onGreenChange(event: InputFieldChangeEvent) {
    setBlue(event.value);
    onChange(RGBColor.toHSV({...color, green: Utility.parseRGB(event.value)}));
  }
  
  function onAlphaChange(event: InputFieldChangeEvent) {
    setAlpha(event.value);
    onChange(RGBColor.toHSV({...color, alpha: Utility.parseAlpha(event.value)}));
  }
}

export interface RGBInputProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: RGBColor.Definition;
  onChange(color: HSVColor.Definition): void;
}
