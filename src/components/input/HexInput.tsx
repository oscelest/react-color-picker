import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {HTMLProps, useEffect, useState} from "react";
import Utility from "../../modules/Utility";
import {HexColor, HSVColor} from "@noxy/color";
import Style from "./HexInput.module.css";

export function HexInput(props: HexInputProps) {
  const {color, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const classes = [Style.Component, "color-picker-hex-input"];
  if (className) classes.push(className);
  
  const [hex, setHex] = useState<string>(color.toString().toLowerCase());
  
  useEffect(
    () => {
      setHex(color.toString());
    },
    [color]
  );
  
  return (
    <div {...component_props} className={classes.join(" ")}>
      <InputField className={"hex"} type={InputFieldType.TEXT} label={"Hex"} value={hex} filter={Utility.hex_filter} onChange={onInputChange}/>
    </div>
  );
  
  function onInputChange(event: InputFieldChangeEvent) {
    const hex = event.value.toLowerCase();
    
    setHex(hex);
    onChange(new HexColor(HexColor.sanitize(event.value)).toHSV());
  }
}

export interface HexInputProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: HexColor;
  onChange?(color: HSVColor): void;
}
