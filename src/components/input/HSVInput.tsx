import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {HTMLProps, useEffect, useState} from "react";
import {HSVColor} from "../../modules";
import Utility from "../../modules/Utility";
import Style from "./HSVInput.module.css";

export function HSVInput(props: HSVInputProps) {
  const {color, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const classes = [Style.Component, "color-picker-input"];
  if (className) classes.push(className);
  
  const [hsv, setHSV] = useState<HSVColor.Definition>(color);
  
  useEffect(() => setHSV(color), [color]);
  
  return (
    <div {...component_props} className={classes.join(" ")}>
      <InputField className={"color-picker-input hsva-hue"} type={InputFieldType.TEL} label={"H"} value={hsv.hue} filter={Utility.number_filter} onChange={onHueChange}/>
      <InputField className={"color-picker-input hsva-saturation"} type={InputFieldType.TEL} label={"S"} value={hsv.saturation} filter={Utility.number_filter} onChange={onSaturationChange}/>
      <InputField className={"color-picker-input hsva-value"} type={InputFieldType.TEL} label={"V"} value={hsv.value} filter={Utility.number_filter} onChange={onValueChange}/>
      <InputField className={"color-picker-input hsva-alpha"} type={InputFieldType.TEL} label={"A"} value={hsv.alpha} filter={Utility.number_filter} onChange={onAlphaChange}/>
    </div>
  );
  
  function onHueChange(event: InputFieldChangeEvent) {
    updateColor({...hsv, hue: Utility.parseHue(event.value)});
  }
  
  function onSaturationChange(event: InputFieldChangeEvent) {
    updateColor({...hsv, saturation: Utility.parseSVL(event.value)});
  }
  
  function onValueChange(event: InputFieldChangeEvent) {
    updateColor({...hsv, value: Utility.parseSVL(event.value)});
  }
  
  function onAlphaChange(event: InputFieldChangeEvent) {
    updateColor({...hsv, alpha: Utility.parseAlpha(event.value)});
  }
  
  function updateColor(color: HSVColor.Definition) {
    setHSV(color);
    onChange(color);
  }
}

export interface HSVInputProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: HSVColor.Definition;
  onChange(value: HSVColor.Definition): void;
}
