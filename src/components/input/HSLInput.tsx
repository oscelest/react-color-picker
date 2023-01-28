import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {HTMLProps, useEffect, useState} from "react";
import {HSLColor, HSVColor} from "../../modules";
import Utility from "../../modules/Utility";
import Style from "./HSLInput.module.css";

export function HSLInput(props: HSLInputProps) {
  const {color, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const classes = [Style.Component, "color-picker-input"];
  if (className) classes.push(className);
  
  const [hsl, setHsl] = useState<HSLColor.Definition>(color);
  
  useEffect(() => setHsl(color), [color]);
  
  return (
    <div {...component_props} className={classes.join(" ")}>
      <InputField className={"color-picker-input hsla-hue"} type={InputFieldType.TEL} label={"H"} value={hsl.hue} filter={Utility.number_filter} onChange={onHueChange}/>
      <InputField className={"color-picker-input hsla-saturation"} type={InputFieldType.TEL} label={"S"} value={hsl.saturation} filter={Utility.number_filter} onChange={onSaturationChange}/>
      <InputField className={"color-picker-input hsla-lightness"} type={InputFieldType.TEL} label={"L"} value={hsl.lightness} filter={Utility.number_filter} onChange={onLightnessChange}/>
      <InputField className={"color-picker-input hsla-alpha"} type={InputFieldType.TEL} label={"A"} value={hsl.alpha} filter={Utility.number_filter} onChange={onAlphaChange}/>
    </div>
  );
  
  function onHueChange(event: InputFieldChangeEvent) {
    updateColor({...hsl, hue: Utility.parseHue(event.value)});
  }
  
  function onSaturationChange(event: InputFieldChangeEvent) {
    updateColor({...hsl, saturation: Utility.parseSVL(event.value)});
  }
  
  function onLightnessChange(event: InputFieldChangeEvent) {
    updateColor({...hsl, lightness: Utility.parseSVL(event.value)});
  }
  
  function onAlphaChange(event: InputFieldChangeEvent) {
    updateColor({...hsl, alpha: Utility.parseAlpha(event.value)});
  }
  
  function updateColor(value: HSLColor.Definition) {
    setHsl(value);
    onChange(HSLColor.toHSV(value));
  }
}

export interface HSLInputProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: HSLColor.Definition;
  onChange(color: HSVColor.Definition): void;
}
