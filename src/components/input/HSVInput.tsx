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
  
  const [hue, setHue] = useState<string>(Utility.toIntString(color.hue));
  const [saturation, setSaturation] = useState<string>(Utility.toPercentageString(color.saturation));
  const [value, setValue] = useState<string>(Utility.toPercentageString(color.value));
  const [alpha, setAlpha] = useState<string>(Utility.toPercentageString(color.alpha));
  
  useEffect(
    () => {
      if (color.hue !== Utility.parseHue(hue)) setHue(Utility.toIntString(color.hue));
      if (color.saturation !== Utility.parseSVL(saturation)) setSaturation(Utility.toPercentageString(color.saturation));
      if (color.value !== Utility.parseSVL(value)) setValue(Utility.toPercentageString(color.value));
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
    onChange({...color, hue: Utility.parseHue(event.value)});
  }
  
  function onSaturationChange(event: InputFieldChangeEvent) {
    setSaturation(event.value);
    onChange({...color, saturation: Utility.parseSVL(event.value)});
  }
  
  function onValueChange(event: InputFieldChangeEvent) {
    setValue(event.value);
    onChange({...color, value: Utility.parseSVL(event.value)});
  }
  
  function onAlphaChange(event: InputFieldChangeEvent) {
    setAlpha(event.value);
    onChange({...color, alpha: Utility.parseAlpha(event.value)});
  }
}

export interface HSVInputProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: HSVColor.Definition;
  onChange(value: HSVColor.Definition): void;
}
