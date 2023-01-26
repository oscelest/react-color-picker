import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {useEffect, useState} from "react";
import {RGBColor} from "../modules";
import Utility from "../modules/Utility";

export function RGBAInput(props: RGBAInputProps) {
  const {value} = props;
  const [color, setColor] = useState<RGBColor.Definition>(value);
  
  return (
    <>
      <InputField className={"color-picker-input rgba-red"} type={InputFieldType.TEL} label={"Red"} value={color.red} filter={Utility.number_filter} onChange={onRedChange}/>
      <InputField className={"color-picker-input rgba-green"} type={InputFieldType.TEL} label={"Green"} value={color.green} filter={Utility.number_filter} onChange={onBlueChange}/>
      <InputField className={"color-picker-input rgba-blue"} type={InputFieldType.TEL} label={"Blue"} value={color.blue} filter={Utility.number_filter} onChange={onGreenChange}/>
      <InputField className={"color-picker-input rgba-alpha"} type={InputFieldType.TEL} label={"Alpha"} value={color.alpha} filter={Utility.number_filter} onChange={onAlphaChange}/>
    </>
  );
  
  function onRedChange(event: InputFieldChangeEvent) {
    updateColor({...color, red: Utility.parseRGB(event.value)});
  }
  
  function onBlueChange(event: InputFieldChangeEvent) {
    updateColor({...color, blue: Utility.parseRGB(event.value)});
  }
  
  function onGreenChange(event: InputFieldChangeEvent) {
    updateColor({...color, green: Utility.parseRGB(event.value)});
  }
  
  function onAlphaChange(event: InputFieldChangeEvent) {
    setColor({...color, alpha: Utility.parseAlpha(event.value)});
  }
  
  function updateColor(color: RGBColor.Definition) {
    setColor(color);
    props.onChange(color);
  }
}

export interface RGBAInputProps {
  value: RGBColor.Definition
  onChange(color: RGBColor.Definition): void;
}
