import {HSLColor, HSVColor} from "@noxy/color";
import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {HTMLProps, useEffect, useState} from "react";
import Utility from "../../modules/Utility";
import Style from "./HSLInput.module.css";

export function HSLInput(props: HSLInputProps) {
  const {color, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const classes = [Style.Component, "color-picker-hsl-input"];
  if (className) classes.push(className);
  
  const [hue, setHue] = useState<string>(Utility.toIntString(color.hue));
  const [saturation, setSaturation] = useState<string>(Utility.toPercentageString(color.saturation));
  const [lightness, setLightness] = useState<string>(Utility.toPercentageString(color.lightness));
  const [alpha, setAlpha] = useState<string>(Utility.toPercentageString(color.alpha));
  
  useEffect(
    () => {
      if (color.hue !== Utility.parseDegree(hue)) setHue(Utility.toIntString(color.hue));
      if (color.saturation !== Utility.parseDecimal(saturation)) setSaturation(Utility.toPercentageString(color.saturation));
      if (color.lightness !== Utility.parseDecimal(lightness)) setLightness(Utility.toPercentageString(color.lightness));
      if (color.alpha !== Utility.parseDecimal(alpha)) setAlpha(Utility.toPercentageString(color.alpha));
    },
    [color]
  );
  
  return (
    <div {...component_props} className={classes.join(" ")}>
      <InputField className={"hsl-hue"} type={InputFieldType.TEL} label={"H"} value={hue} filter={Utility.number_filter} onChange={onHueChange}/>
      <InputField className={"hsl-saturation"} type={InputFieldType.TEL} label={"S"} value={saturation} filter={Utility.number_filter} onChange={onSaturationChange}/>
      <InputField className={"hsl-lightness"} type={InputFieldType.TEL} label={"L"} value={lightness} filter={Utility.number_filter} onChange={onLightnessChange}/>
      <InputField className={"hsl-alpha"} type={InputFieldType.TEL} label={"A"} value={alpha} filter={Utility.number_filter} onChange={onAlphaChange}/>
    </div>
  );
  
  function onHueChange(event: InputFieldChangeEvent) {
    setHue(event.value);
    onChange(new HSLColor(Utility.parseDegree(event.value), color.saturation, color.lightness, color.alpha).toHSV());
  }
  
  function onSaturationChange(event: InputFieldChangeEvent) {
    setSaturation(event.value);
    onChange(new HSLColor(color.hue, Utility.parseDecimal(event.value), color.lightness, color.alpha).toHSV());
  }
  
  function onLightnessChange(event: InputFieldChangeEvent) {
    setLightness(event.value);
    onChange(new HSLColor(color.hue, color.saturation, Utility.parseDecimal(event.value), color.alpha).toHSV());
  }
  
  function onAlphaChange(event: InputFieldChangeEvent) {
    setAlpha(event.value);
    onChange(new HSLColor(color.hue, color.saturation, color.lightness, Utility.parseDecimal(event.value)).toHSV());
  }
}

export interface HSLInputProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: HSLColor;
  onChange(color: HSVColor): void;
}
