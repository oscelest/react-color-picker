import {InputField, InputFieldType} from "@noxy/react-input-field";
import {useState, useEffect} from "react";
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
      <InputField className={"hsva-input hue"} type={InputFieldType.TEL} label={"Hue"} input={hue} filter={Utility.number_filter} onInputChange={onHueChange}/>
      <InputField className={"hsva-input saturation"} type={InputFieldType.TEL} label={"Saturation"} input={saturation} filter={Utility.number_filter} onInputChange={onSaturationChange}/>
      <InputField className={"hsva-input value"} type={InputFieldType.TEL} label={"Value"} input={value} filter={Utility.number_filter} onInputChange={onValueChange}/>
      <InputField className={"hsva-input alpha"} type={InputFieldType.TEL} label={"Alpha"} input={alpha} filter={Utility.number_filter} onInputChange={onAlphaChange}/>
    </>
  );

  function onHueChange(hue: string) {
    setHue(hue);
    updateColor(hue, saturation, value, alpha);
  }

  function onSaturationChange(saturation: string) {
    setSaturation(saturation);
    updateColor(hue, saturation, value, alpha);
  }

  function onValueChange(value: string) {
    setValue(value);
    updateColor(hue, saturation, value, alpha);
  }

  function onAlphaChange(alpha: string) {
    setAlpha(alpha);
    updateColor(hue, saturation, value, alpha);
  }

  function updateColor(hue: string, saturation: string, value: string, alpha: string) {
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
