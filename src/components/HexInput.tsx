import {InputField, InputFieldType} from "@noxy/react-input-field";
import Utility from "../modules/Utility";
import React, {useState, useEffect} from "react";

function HexInput(props: HexInputProps) {
  const [hex, setHex] = useState<string>(props.hex.toLowerCase());
  useEffect(() => setHex(Utility.getFullHex(hex) === Utility.getFullHex(props.hex) ? hex : props.hex.toLowerCase()), [props.hex]);

  return (
    <>
      <InputField className={"color-picker-input hex"} type={InputFieldType.TEXT} label={"Hex"} input={hex} filter={Utility.hex_filter} onInputChange={onHexChange} onCommit={onHexCommit}/>
    </>
  );

  function onHexChange(hex: string) {
    hex = hex.toLowerCase();
    setHex(hex);
    props.onChange(Utility.getFullHex(hex));
  }

  function onHexCommit() {
    const full_hex = Utility.getFullHex(hex);
    setHex(full_hex);
    props.onChange(full_hex);
  }
}

export interface HexInputProps {
  hex: string;
  onChange(hex: string): void;
}

export default HexInput;
