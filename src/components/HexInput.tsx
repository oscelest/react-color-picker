import {InputField, InputFieldType} from "@noxy/react-input-field";
import {getFullHex} from "../Utility";
import {useState, useEffect} from "react";

const filter = /^#?[a-f\d]{0,8}$/i;

function HexInput(props: HexInputProps) {
  const [hex, setHex] = useState<string>("");
  const [previous_hex, setPreviousHex] = useState<string>();

  useEffect(
    () => {
      if (props.hex === undefined || props.hex === previous_hex) return;
      setHex(props.hex);
      setPreviousHex(props.hex);
    },
    [props.hex]
  );

  return (
    <>
      <InputField className={"hex-input hex"} type={InputFieldType.TEXT} label={"Hex"} input={hex} filter={filter} onInputChange={onHexChange} onCommit={onHexCommit}/>
    </>
  );

  function onHexChange(hex: string) {
    hex = hex.toLowerCase();
    setHex(hex);

    hex = getFullHex(hex);
    setPreviousHex(hex);
    props.onChange(hex);
  }

  function onHexCommit() {
    const full_hex = getFullHex(hex);
    setHex(full_hex);
    setPreviousHex(full_hex);
    props.onChange(full_hex);
  }
}

export interface HexInputProps {
  hex?: string;
  onChange(hex?: string): void;
}

export default HexInput;
