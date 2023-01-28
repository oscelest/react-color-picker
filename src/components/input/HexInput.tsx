import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {HTMLProps, useEffect, useState} from "react";
import {HexColor, HSVColor} from "../../modules";
import Utility from "../../modules/Utility";
import Style from "./HexInput.module.css";

export function HexInput(props: HexInputProps) {
  const {color, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const classes = [Style.Component, "color-picker-input"];
  if (className) classes.push(className);
  
  const [hex, setHex] = useState<string>(color.toLowerCase());
  
  useEffect(
    () => {
      if (Utility.getFullHex(hex) !== Utility.getFullHex(color)) setHex(color.toLowerCase());
    },
    [color]
  );
  
  return (
    <div {...component_props} className={classes.join(" ")}>
      <InputField className={`${Style.Component} hex`} type={InputFieldType.TEXT} label={"Hex"} value={hex} filter={Utility.hex_filter} onChange={onInputChange}/>
    </div>
  );
  
  function onInputChange(event: InputFieldChangeEvent) {
    const hex = event.value.toLowerCase();
    
    setHex(hex);
    onChange(HexColor.toHSV(Utility.getFullHex(hex)));
  }
}

export interface HexInputProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: HexColor.Definition;
  onChange?(color: HSVColor.Definition): void;
}
