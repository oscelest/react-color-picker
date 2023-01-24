import {InputField, InputFieldType} from "@noxy/react-input-field";
import React, {useEffect, useState} from "react";
import Utility from "../modules/Utility";

export function RGBAInput(props: RGBAInputProps) {
  const [red, setRed] = useState<string>(props.red.toFixed(0));
  const [green, setGreen] = useState<string>(props.blue.toFixed(0));
  const [blue, setBlue] = useState<string>(props.green.toFixed(0));
  const [alpha, setAlpha] = useState<string>(props.alpha.toFixed(0));
  
  useEffect(() => setRed(Utility.resolveValue(props.red, red)), [props.red]);
  useEffect(() => setGreen(Utility.resolveValue(props.green, green)), [props.green]);
  useEffect(() => setBlue(Utility.resolveValue(props.blue, blue)), [props.blue]);
  useEffect(() => setAlpha(Utility.resolveValue(props.alpha, alpha)), [props.alpha]);
  
  return (
    <>
      <InputField className={"color-picker-input rgba-red"} type={InputFieldType.TEL} label={"R"} input={red} filter={Utility.number_filter}
                  onInputChange={onRedChange} onCommit={onCommit}/>
      <InputField className={"color-picker-input rgba-green"} type={InputFieldType.TEL} label={"G"} input={green} filter={Utility.number_filter}
                  onInputChange={onBlueChange} onCommit={onCommit}/>
      <InputField className={"color-picker-input rgba-blue"} type={InputFieldType.TEL} label={"B"} input={blue} filter={Utility.number_filter}
                  onInputChange={onGreenChange} onCommit={onCommit}/>
      <InputField className={"color-picker-input rgba-alpha"} type={InputFieldType.TEL} label={"A"} input={alpha} filter={Utility.number_filter}
                  onInputChange={onAlphaChange} onCommit={onCommit}/>
    </>
  );
  
  function onRedChange(red: string) {
    updateColor(red, green, blue, alpha);
  }
  
  function onBlueChange(green: string) {
    updateColor(red, green, blue, alpha);
  }
  
  function onGreenChange(blue: string) {
    updateColor(red, green, blue, alpha);
  }
  
  function onAlphaChange(alpha: string) {
    updateColor(red, green, blue, alpha);
  }
  
  function onCommit() {
    updateColor((props.red).toFixed(0), (props.green * 100).toFixed(0), (props.blue * 100).toFixed(0), (props.alpha * 100).toFixed(0));
  }
  
  function updateColor(red: string, green: string, blue: string, alpha: string) {
    setRed(red);
    setGreen(green);
    setBlue(blue);
    setAlpha(alpha);
    props.onChange(Utility.parseRGB(red), Utility.parseRGB(green), Utility.parseRGB(blue), Utility.parseAlpha(alpha));
  }
}

export interface RGBAInputProps {
  red: number;
  green: number;
  blue: number;
  alpha: number;
  onChange(red: number, green: number, blue: number, alpha: number): void;
}
