import {InputField, InputFieldType} from "@noxy/react-input-field";
import {sanitizeHex, getFullHex} from "../Utility";

function RGBAInput(props: RGBAInputProps) {

  return (
    <>
      <InputField className={"rgba-input red"} type={InputFieldType.TEL} label={"Red"} input={props.hex ?? ""} onInputChange={onHexChange} onCommit={onHexCommit}/>
      <InputField className={"rgba-input green"} type={InputFieldType.TEL} label={"Green"} input={props.hex ?? ""} onInputChange={onHexChange} onCommit={onHexCommit}/>
      <InputField className={"rgba-input blue"} type={InputFieldType.TEL} label={"Blue"} input={props.hex ?? ""} onInputChange={onHexChange} onCommit={onHexCommit}/>
      <InputField className={"rgba-input alpha"} type={InputFieldType.TEL} label={"Alpha"} input={props.hex ?? ""} onInputChange={onHexChange} onCommit={onHexCommit}/>
    </>
  );

  function onHexChange(input: string) {
    props.onChange(sanitizeHex(input));
  }

  function onHexCommit() {
    if (props.hex) props.onChange(getFullHex(sanitizeHex(props.hex)));
  }
}

export interface RGBAInputProps {
  hex?: string;
  onChange(hex?: string): void;
}

export default RGBAInput;
