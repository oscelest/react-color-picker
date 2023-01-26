import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {useEffect, useState} from "react";
import {HSVColor} from "../modules";
import Utility from "../modules/Utility";

export function HSVAInput(props: HSVAInputProps) {
  const [color, setColor] = useState<HSVColor.Definition>(props.value);
  
  useEffect(() => setColor(props.value), [props.value]);
  
  return (
    <>
      <InputField className={"color-picker-input hsva-hue"} type={InputFieldType.TEL} label={"H"} value={color.hue} filter={Utility.number_filter} onChange={onHueChange}/>
      <InputField className={"color-picker-input hsva-saturation"} type={InputFieldType.TEL} label={"S"} value={color.saturation} filter={Utility.number_filter} onChange={onSaturationChange}/>
      <InputField className={"color-picker-input hsva-value"} type={InputFieldType.TEL} label={"V"} value={color.value} filter={Utility.number_filter} onChange={onValueChange}/>
      <InputField className={"color-picker-input hsva-alpha"} type={InputFieldType.TEL} label={"A"} value={color.alpha} filter={Utility.number_filter} onChange={onAlphaChange}/>
    </>
  );
  
  function onHueChange(event: InputFieldChangeEvent) {
    updateColor({...color, hue: Utility.parseHue(event.value)});
  }
  
  function onSaturationChange(event: InputFieldChangeEvent) {
    updateColor({...color, saturation: Utility.parseSVL(event.value)});
  }
  
  function onValueChange(event: InputFieldChangeEvent) {
    updateColor({...color, value: Utility.parseSVL(event.value)});
  }
  
  function onAlphaChange(event: InputFieldChangeEvent) {
    updateColor({...color, alpha: Utility.parseAlpha(event.value)});
  }
  
  function updateColor(color: HSVColor.Definition) {
    setColor(color);
    props.onChange(color);
  }
}

export interface HSVAInputProps {
  value: HSVColor.Definition;
  onChange(value: HSVColor.Definition): void;
}
