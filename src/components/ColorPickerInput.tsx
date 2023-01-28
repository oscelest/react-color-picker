import {InputField, InputFieldChangeEvent, InputFieldEventType} from "@noxy/react-input-field";
import React, {HTMLProps, useState} from "react";
import {HSVColor, Utility} from "../modules";
import Style from "./ColorPickerInput.module.css";
import {HexInput, HSLInput, HSVInput, RGBInput} from "./input";

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
        // RGBA values are (0-255, 0-255, 0-255, 0-100)
        return (
          <RGBInput color={HSVColor.toRGB(color)} onChange={onChange}/>
        );
      }
      case 2:
        // HSVA values are (0-360, 0-1, 0-1, 0-1)
        return (
          <HSVInput color={color} onChange={onChange}/>
        );
      case 3: {
        // HSLA values are (0-360, 0-1, 0-1, 0-1)
        return (
          <HSLInput color={HSVColor.toHSL(color)} onChange={onChange}/>
        );
      }
      default:
        // Hex value is (#0f0f0f0f)
        return (
          <HexInput color={HSVColor.toHex(color)} onChange={onChange}/>
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
  color: HSVColor.Definition;
  onChange(color: HSVColor.Definition): void;
}
