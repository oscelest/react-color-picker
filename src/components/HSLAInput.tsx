import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {useEffect, useState} from "react";
import {HSLColor} from "../modules";
import Utility from "../modules/Utility";

export function HSLAInput(props: HSLAInputProps) {
  const [color, setColor] = useState<HSLColor.Definition>(props.value);
  
  useEffect(() => setColor(props.value), [props.value]);
  
  return (
    <>
      <InputField className={"color-picker-input hsla-hue"} type={InputFieldType.TEL} label={"H"} value={color.hue} filter={Utility.number_filter} onChange={onHueChange}/>
      <InputField className={"color-picker-input hsla-saturation"} type={InputFieldType.TEL} label={"S"} value={color.saturation} filter={Utility.number_filter} onChange={onSaturationChange}/>
      <InputField className={"color-picker-input hsla-lightness"} type={InputFieldType.TEL} label={"L"} value={color.lightness} filter={Utility.number_filter} onChange={onLightnessChange}/>
      <InputField className={"color-picker-input hsla-alpha"} type={InputFieldType.TEL} label={"A"} value={color.alpha} filter={Utility.number_filter} onChange={onAlphaChange}/>
    </>
  );
  
  function onHueChange(event: InputFieldChangeEvent) {
    updateColor({...color, hue: Utility.parseHue(event.value)});
  }
  
  function onSaturationChange(event: InputFieldChangeEvent) {
    updateColor({...color, saturation: Utility.parseSVL(event.value)});
  }
  
  function onLightnessChange(event: InputFieldChangeEvent) {
    updateColor({...color, lightness: Utility.parseSVL(event.value)});
  }
  
  function onAlphaChange(event: InputFieldChangeEvent) {
    updateColor({...color, alpha: Utility.parseAlpha(event.value)});
  }
  
  function updateColor(value: HSLColor.Definition) {
    setColor(value);
    props.onChange(value);
  }
}

export interface HSLAInputProps {
  value: HSLColor.Definition;
  onChange(color: HSLColor.Definition): void;
}
