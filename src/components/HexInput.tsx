import {InputField, InputFieldType} from "@noxy/react-input-field";
import {sanitizeHex, getFullHex} from "../Utility";

function HexInput(props: HexInputProps) {

  return (
    <>
      <InputField className={"hex-input hex"} type={InputFieldType.TEXT} label={"Hex"} input={props.hex ?? ""} onInputChange={onHexChange} onCommit={onHexCommit}/>
    </>
  );

  function onHexChange(input: string) {
    props.onChange(sanitizeHex(input));
  }

  function onHexCommit() {
    if (props.hex) props.onChange(getFullHex(sanitizeHex(props.hex)));
  }
}

export interface HexInputProps {
  hex?: string;
  onChange(hex?: string): void;
}

export default HexInput;
