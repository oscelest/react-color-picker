import {HSVColor} from "@noxy/color";
import {InputField, InputFieldChangeEvent, InputFieldEventType} from "@noxy/react-input-field";
import React, {HTMLProps, useState} from "react";
import {Utility} from "../modules";
import Style from "./ColorPickerInput.module.css";
import {HexInput, HSLInput, HSVInput, RGBInput} from "./input";
import {CMYKInput} from "./input/CMYKInput";
import {HWBInput} from "./input/HWBInput";

export function ColorPickerInput(props: ColorPickerInputProps) {
  const {color, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const classes = [Style.Component, "color-picker-input"];
  if (className) classes.push(className);
  
  // Input specific state values
  const [type, setType] = useState<number>(0);
  const [type_input, setTypeInput] = useState<[string, number]>([Utility.color_type_list[type], type]);
  
  return (
    <div {...component_props} className={classes.join(" ")}>
      <InputField className={"color-picker-type"} label={"Type"} max={3} useCaret={true} value={type_input[0]} index={type_input[1]} onChange={onTypeChange}>
        {Utility.color_type_list}
      </InputField>
      {renderInput()}
    </div>
  );
  
  function renderInput() {
    switch (type) {
      case 1: {
        return (
          <RGBInput color={color.toRGB()} onChange={onChange}/>
        );
      }
      case 2:
        return (
          <HSVInput color={color} onChange={onChange}/>
        );
      case 3: {
        return (
          <HSLInput color={color.toHSL()} onChange={onChange}/>
        );
      }
      case 4: {
        return (
          <HWBInput color={color.toHWB()} onChange={onChange}/>
        );
      }
      case 5: {
        return (
          <CMYKInput color={color.toCMYK()} onChange={onChange}/>
        );
      }
      default:
        return (
          <HexInput color={color.toHex()} onChange={onChange}/>
        );
    }
  }
  
  function onTypeChange(event: InputFieldChangeEvent) {
    if (event.type === InputFieldEventType.COMMIT || event.type === InputFieldEventType.RESET) {
      setType(event.index);
    }
    
    setTypeInput([event.value, event.index]);
  }
}

export interface ColorPickerInputProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: HSVColor;
  onChange(color: HSVColor): void;
}
