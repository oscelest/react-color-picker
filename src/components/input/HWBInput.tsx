import {HSVColor, HWBColor} from "@noxy/color";
import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {HTMLProps, useEffect, useState} from "react";
import Utility from "../../modules/Utility";
import Style from "./HSVInput.module.css";

export function HWBInput(props: HWBInputProps) {
  const {color, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const classes = [Style.Component, "color-picker-hwb-input"];
  if (className) classes.push(className);
  
  const [hue, setHue] = useState<string>(Utility.toIntString(color.hue));
  const [whiteness, setWhiteness] = useState<string>(Utility.toPercentageString(color.whiteness));
  const [blackness, setBlackness] = useState<string>(Utility.toPercentageString(color.blackness));
  const [alpha, setAlpha] = useState<string>(Utility.toPercentageString(color.alpha));
  
  useEffect(
    () => {
      if (color.hue !== Utility.parseDegree(hue)) setHue(Utility.toIntString(color.hue));
      if (color.whiteness !== Utility.parseDecimal(whiteness)) setWhiteness(Utility.toPercentageString(color.whiteness));
      if (color.blackness !== Utility.parseDecimal(blackness)) setBlackness(Utility.toPercentageString(color.blackness));
      if (color.alpha !== Utility.parseDecimal(alpha)) setAlpha(Utility.toPercentageString(color.alpha));
    },
    [color]
  );
  
  return (
    <div {...component_props} className={classes.join(" ")}>
      <InputField className={"hsv-hue"} type={InputFieldType.TEL} label={"H"} value={hue} filter={Utility.number_filter} onChange={onHueChange}/>
      <InputField className={"hsv-saturation"} type={InputFieldType.TEL} label={"S"} value={whiteness} filter={Utility.number_filter} onChange={onSaturationChange}/>
      <InputField className={"hsv-value"} type={InputFieldType.TEL} label={"V"} value={blackness} filter={Utility.number_filter} onChange={onValueChange}/>
      <InputField className={"hsv-alpha"} type={InputFieldType.TEL} label={"A"} value={alpha} filter={Utility.number_filter} onChange={onAlphaChange}/>
    </div>
  );
  
  function onHueChange(event: InputFieldChangeEvent) {
    setHue(event.value);
    onChange(new HWBColor(Utility.parseDegree(event.value), color.whiteness, color.blackness, color.alpha).toHSV());
  }
  
  function onSaturationChange(event: InputFieldChangeEvent) {
    setWhiteness(event.value);
    onChange(new HWBColor(color.hue, Utility.parseDecimal(event.value), color.blackness, color.alpha).toHSV());
  }
  
  function onValueChange(event: InputFieldChangeEvent) {
    setBlackness(event.value);
    onChange(new HWBColor(color.hue, color.whiteness, Utility.parseDecimal(event.value), color.alpha).toHSV());
  }
  
  function onAlphaChange(event: InputFieldChangeEvent) {
    setAlpha(event.value);
    onChange(new HWBColor(color.hue, color.whiteness, color.blackness, Utility.parseDecimal(event.value)).toHSV());
  }
}

export interface HWBInputProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: HWBColor;
  onChange(value: HSVColor): void;
}
