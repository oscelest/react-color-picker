import {InputField, InputFieldType} from "@noxy/react-input-field";
import {fromHSVA2Hex, fromHex2HSVA} from "../Utility";
import {useState, useEffect} from "react";

const filter = /\d{0,3}/;

function parseInput(input: string, max: number) {
  return Math.min(max, Math.max(0, +input));
}

function HSVAInput(props: HSVAInputProps) {
  const [hue_input, setHueInput] = useState<string>("");
  const [saturation_input, setSaturationInput] = useState<string>("");
  const [value_input, setValueInput] = useState<string>("");
  const [alpha_input, setAlphaInput] = useState<string>("");
  const {hue, saturation, value, alpha} = fromHex2HSVA(props.hex);

  useEffect(
    () => {
      const {hue, saturation, value, alpha} = fromHex2HSVA(props.hex);
      setHueInput(String(hue ?? ""));
      setSaturationInput(String(saturation ?? ""));
      setValueInput(String(value ?? ""));
      setAlphaInput(String(alpha ?? ""));
    },
    [props.hex]
  );

  return (
    <>
      <InputField className={"hsva-input hue"} type={InputFieldType.TEL} label={"Hue"} input={hue_input} filter={filter} onInputChange={onHueChange}/>
      <InputField className={"hsva-input saturation"} type={InputFieldType.TEL} label={"Saturation"} input={saturation_input} filter={filter} onInputChange={onSaturationChange}/>
      <InputField className={"hsva-input value"} type={InputFieldType.TEL} label={"Value"} input={value_input} filter={filter} onInputChange={onValueChange}/>
      <InputField className={"hsva-input alpha"} type={InputFieldType.TEL} label={"Alpha"} input={alpha_input} filter={filter} onInputChange={onAlphaChange}/>
    </>
  );

  function onHueChange(hue: string) {
    setHueInput(hue);
    if (hue) return updateColor(parseInput(hue, 360), saturation, value, alpha);
    if (!hue && saturation === undefined && value === undefined && alpha === undefined) props.onChange();
  }

  function onSaturationChange(saturation: string) {
    setSaturationInput(saturation);
    if (saturation) return updateColor(hue, parseInput(saturation, 100), value, alpha);
    if (hue === undefined && !saturation && value === undefined && alpha === undefined) props.onChange();
  }

  function onValueChange(value: string) {
    setValueInput(value);
    if (value) return updateColor(hue, saturation, parseInput(value, 100), alpha);
    if (!hue && saturation === undefined && !value && alpha === undefined) props.onChange();
  }

  function onAlphaChange(alpha: string) {
    setAlphaInput(alpha);
    if (alpha) return updateColor(hue, saturation, value, parseInput(alpha, 100));
    if (hue === undefined && saturation === undefined && value === undefined && !alpha) props.onChange();
  }

  function updateColor(hue?: number, saturation?: number, value?: number, alpha?: number) {
    props.onChange(fromHSVA2Hex(hue, saturation, value, alpha));
  }
}

export interface HSVAInputProps {
  hex?: string;
  onChange(hex?: string): void;
}

export default HSVAInput;
