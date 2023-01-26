import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {useEffect, useState} from "react";
import Utility from "../modules/Utility";
import Style from "./HexInput.module.css"

export function HexInput(props: HexInputProps) {
  const [hex, setHex] = useState<string>(props.hex.toLowerCase());
  
  useEffect(
    () => setHex(Utility.getFullHex(hex) === Utility.getFullHex(props.hex) ? hex : props.hex.toLowerCase()),
    [props.hex]
  );
  
  return (
    <InputField className={`${Style.Component} hex`} type={InputFieldType.TEXT} label={"Hex"} value={hex} filter={Utility.hex_filter} onChange={onChange}/>
  );
  
  function onChange(event: InputFieldChangeEvent) {
    const hex = event.value.toLowerCase();
    
    setHex(hex);
    props.onChange(Utility.getFullHex(hex));
  }
}

export interface HexInputProps {
  hex: string;
  onChange(hex: string): void;
}
