import {HSLColor, HSVColor} from "@noxy/color";
import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {HTMLProps, useEffect, useState} from "react";
import Utility from "../../modules/Utility";
import Style from "./HSVInput.module.css";

export function HSVInput(props: HSVInputProps) {
  const {color, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const classes = [Style.Component, "color-picker-hsv-input"];
  if (className) classes.push(className);
  
  const [hue, setHue] = useState<string>(Utility.toIntString(color.hue));
  const [saturation, setSaturation] = useState<string>(Utility.toPercentageString(color.saturation));
  const [value, setValue] = useState<string>(Utility.toPercentageString(color.value));
  const [alpha, setAlpha] = useState<string>(Utility.toPercentageString(color.alpha));
  
  useEffect(
    () => {
      if (color.hue !== Utility.parseDegree(hue)) setHue(Utility.toIntString(color.hue));
      if (color.saturation !== Utility.parseDecimal(saturation)) setSaturation(Utility.toPercentageString(color.saturation));
      if (color.value !== Utility.parseDecimal(value)) setValue(Utility.toPercentageString(color.value));
      if (color.alpha !== Utility.parseAlpha(alpha)) setAlpha(Utility.toPercentageString(color.alpha));
    },
    [color]
  );
  
  return (
    <div {...component_props} className={classes.join(" ")}>
      <InputField className={"hsv-hue"} type={InputFieldType.TEL} label={"H"} value={hue} filter={Utility.number_filter} onChange={onHueChange}/>
      <InputField className={"hsv-saturation"} type={InputFieldType.TEL} label={"S"} value={saturation} filter={Utility.number_filter} onChange={onSaturationChange}/>
      <InputField className={"hsv-value"} type={InputFieldType.TEL} label={"V"} value={value} filter={Utility.number_filter} onChange={onValueChange}/>
      <InputField className={"hsv-alpha"} type={InputFieldType.TEL} label={"A"} value={alpha} filter={Utility.number_filter} onChange={onAlphaChange}/>
    </div>
  );
  
  function onHueChange(event: InputFieldChangeEvent) {
    setHue(event.value);
    onChange(new HSLColor(Utility.parseDegree(event.value), color.saturation, color.value, color.alpha).toHSV());
  }
  
  function onSaturationChange(event: InputFieldChangeEvent) {
    setSaturation(event.value);
    onChange(new HSLColor(color.hue, Utility.parseDecimal(event.value), color.value, color.alpha).toHSV());
  }
  
  function onValueChange(event: InputFieldChangeEvent) {
    setValue(event.value);
    onChange(new HSLColor(color.hue, color.saturation, Utility.parseDecimal(event.value), color.alpha).toHSV());
  }
  
  function onAlphaChange(event: InputFieldChangeEvent) {
    setAlpha(event.value);
    onChange(new HSLColor(color.hue, color.saturation, color.value, Utility.parseAlpha(event.value)).toHSV());
  }
}

export interface HSVInputProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: HSVColor;
  onChange(value: HSVColor): void;
}
