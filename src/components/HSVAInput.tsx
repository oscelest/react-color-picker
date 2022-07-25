import {InputField, InputFieldType} from "@noxy/react-input-field";
import React, {useState, useEffect} from "react";
import Utility from "../modules/Utility";

function HSVAInput(props: HSVAInputProps) {
  const [hue, setHue] = useState<string>(props.hue.toFixed(0));
  const [saturation, setSaturation] = useState<string>(props.saturation.toFixed(0));
  const [value, setValue] = useState<string>(props.value.toFixed(0));
  const [alpha, setAlpha] = useState<string>(props.alpha.toFixed(0));

  useEffect(() => setHue(Utility.resolveValue(props.hue, hue)), [props.hue]);
  useEffect(() => setSaturation(Utility.resolveValue(props.saturation * 100, saturation)), [props.saturation]);
  useEffect(() => setValue(Utility.resolveValue(props.value * 100, value)), [props.value]);
  useEffect(() => setAlpha(Utility.resolveValue(props.alpha * 100, alpha)), [props.alpha]);

  return (
    <>
      <InputField className={"color-picker-input hsva-hue"} type={InputFieldType.TEL} label={"H"} input={hue} filter={Utility.number_filter}
                  onInputChange={onHueChange} onCommit={onCommit}/>
      <InputField className={"color-picker-input hsva-saturation"} type={InputFieldType.TEL} label={"S"} input={saturation} filter={Utility.number_filter}
                  onInputChange={onSaturationChange} onCommit={onCommit}/>
      <InputField className={"color-picker-input hsva-value"} type={InputFieldType.TEL} label={"V"} input={value} filter={Utility.number_filter}
                  onInputChange={onValueChange} onCommit={onCommit}/>
      <InputField className={"color-picker-input hsva-alpha"} type={InputFieldType.TEL} label={"A"} input={alpha} filter={Utility.number_filter}
                  onInputChange={onAlphaChange} onCommit={onCommit}/>
    </>
  );

  function onHueChange(hue: string) {
    updateColor(hue, saturation, value, alpha);
  }

  function onSaturationChange(saturation: string) {
    updateColor(hue, saturation, value, alpha);
  }

  function onValueChange(value: string) {
    updateColor(hue, saturation, value, alpha);
  }

  function onAlphaChange(alpha: string) {
    updateColor(hue, saturation, value, alpha);
  }

  function onCommit() {
    updateColor((props.hue).toFixed(0), (props.saturation * 100).toFixed(0), (props.value * 100).toFixed(0), (props.alpha * 100).toFixed(0));
  }

  function updateColor(hue: string, saturation: string, value: string, alpha: string) {
    setHue(hue);
    setSaturation(saturation);
    setValue(value);
    setAlpha(alpha);
    props.onChange(Utility.parseHue(hue), Utility.parseSVLA(saturation), Utility.parseSVLA(value), Utility.parseSVLA(alpha));
  }
}

export interface HSVAInputProps {
  hue: number;
  saturation: number;
  value: number;
  alpha: number;
  onChange(hue: number, saturation: number, value: number, alpha: number): void;
}

export default HSVAInput;
