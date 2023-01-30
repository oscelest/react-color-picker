import {HSVColor, RGBColor} from "@noxy/color";
import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {HTMLProps, useEffect, useState} from "react";
import Utility from "../../modules/Utility";
import Style from "./RGBInput.module.css";

export function RGBInput(props: RGBInputProps) {
  const {color, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const classes = [Style.Component, "color-picker-rgb-input"];
  if (className) classes.push(className);
  
  const [red, setRed] = useState<string>(Utility.toIntString(color.red));
  const [green, setGreen] = useState<string>(Utility.toIntString(color.green));
  const [blue, setBlue] = useState<string>(Utility.toIntString(color.blue));
  const [alpha, setAlpha] = useState<string>(Utility.toIntString(color.alpha * 100));
  
  useEffect(
    () => {
      if (color.red !== Utility.parseRGB(red)) setRed(Utility.toIntString(color.red));
      if (color.green !== Utility.parseRGB(green)) setGreen(Utility.toIntString(color.green));
      if (color.blue !== Utility.parseRGB(blue)) setBlue(Utility.toIntString(color.blue));
      if (color.alpha !== Utility.parseDecimal(alpha)) setAlpha(Utility.toIntString(color.alpha * 100));
    },
    [color]
  );
  
  return (
    <div {...component_props} className={classes.join(" ")}>
      <InputField className={"rgb-red"} type={InputFieldType.TEL} label={"R"} value={red} filter={Utility.number_filter} onChange={onRedChange}/>
      <InputField className={"rgb-green"} type={InputFieldType.TEL} label={"G"} value={green} filter={Utility.number_filter} onChange={onGreenChange}/>
      <InputField className={"rgb-blue"} type={InputFieldType.TEL} label={"B"} value={blue} filter={Utility.number_filter} onChange={onBlueChange}/>
      <InputField className={"rgb-alpha"} type={InputFieldType.TEL} label={"A"} value={alpha} filter={Utility.number_filter} onChange={onAlphaChange}/>
    </div>
  );
  
  function onRedChange(event: InputFieldChangeEvent) {
    setRed(event.value);
    onChange(new RGBColor(Utility.parseRGB(event.value), color.green, color.blue, color.alpha).toHSV());
  }
  
  function onBlueChange(event: InputFieldChangeEvent) {
    setBlue(event.value);
    onChange(new RGBColor(color.red, Utility.parseRGB(event.value), color.blue, color.alpha).toHSV());
  }
  
  function onGreenChange(event: InputFieldChangeEvent) {
    setGreen(event.value);
    onChange(new RGBColor(color.red, color.green, Utility.parseRGB(event.value), color.alpha).toHSV());
  }
  
  function onAlphaChange(event: InputFieldChangeEvent) {
    setAlpha(event.value);
    onChange(new RGBColor(color.red, color.green, color.blue, Utility.parseDecimal(event.value)).toHSV());
  }
}

export interface RGBInputProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: RGBColor;
  onChange(color: HSVColor): void;
}
