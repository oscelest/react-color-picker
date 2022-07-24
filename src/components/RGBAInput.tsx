import {InputField, InputFieldType} from "@noxy/react-input-field";
import {useState, useEffect} from "react";
import Utility from "../modules/Utility";

function parseRGB(input: string) {
  return Math.min(Math.max(parseInt(input) || 0, 0), 255);
}

function parseAlpha(input: string) {
  return Math.min(Math.max(parseInt(input) || 0, 0), 100);
}

function resolveValue(prop: number, current: string) {
  const next = prop.toFixed(0);
  const prev = (parseInt(current) || 0).toFixed(0);
  return next === prev ? current : next;
}

function RGBAInput(props: RGBAInputProps) {
  const [red, setRed] = useState<string>(props.red.toFixed(0));
  const [green, setGreen] = useState<string>(props.blue.toFixed(0));
  const [blue, setBlue] = useState<string>(props.green.toFixed(0));
  const [alpha, setAlpha] = useState<string>(props.alpha.toFixed(0));

  useEffect(() => setRed(resolveValue(props.red, red)), [props.red]);
  useEffect(() => setGreen(resolveValue(props.green, green)), [props.green]);
  useEffect(() => setBlue(resolveValue(props.blue, blue)), [props.blue]);
  useEffect(() => setAlpha(resolveValue(props.alpha, alpha)), [props.alpha]);

  return (
    <>
      <InputField className={"color-picker-input rgba-red"} type={InputFieldType.TEL} label={"Red"} input={red} filter={Utility.number_filter} onInputChange={onRedChange}/>
      <InputField className={"color-picker-input rgba-green"} type={InputFieldType.TEL} label={"Green"} input={green} filter={Utility.number_filter} onInputChange={onBlueChange}/>
      <InputField className={"color-picker-input rgba-blue"} type={InputFieldType.TEL} label={"Blue"} input={blue} filter={Utility.number_filter} onInputChange={onGreenChange}/>
      <InputField className={"color-picker-input rgba-alpha"} type={InputFieldType.TEL} label={"Alpha"} input={alpha} filter={Utility.number_filter} onInputChange={onAlphaChange}/>
    </>
  );

  function onRedChange(red: string) {
    setRed(red);
    updateColor(red, green, blue, alpha);
  }

  function onBlueChange(green: string) {
    setGreen(green);
    updateColor(red, green, blue, alpha);
  }

  function onGreenChange(blue: string) {
    setBlue(blue);
    updateColor(red, green, blue, alpha);
  }

  function onAlphaChange(alpha: string) {
    setAlpha(alpha);
    updateColor(red, green, blue, alpha);
  }

  function updateColor(red: string, green: string, blue: string, alpha: string) {
    props.onChange(parseRGB(red), parseRGB(green), parseRGB(blue), parseAlpha(alpha));
  }
}

export interface RGBAInputProps {
  red: number;
  green: number;
  blue: number;
  alpha: number;
  onChange(red: number, green: number, blue: number, alpha: number): void;
}

export default RGBAInput;
