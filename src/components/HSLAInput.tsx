import {InputField, InputFieldType} from "@noxy/react-input-field";
import {useState, useEffect} from "react";
import Utility from "../modules/Utility";

function HSLAInput(props: HSLAInputProps) {
  const [hue, setHue] = useState<string>(props.hue.toFixed(0));
  const [saturation, setSaturation] = useState<string>(props.saturation.toFixed(0));
  const [lightness, setLightness] = useState<string>(props.lightness.toFixed(0));
  const [alpha, setAlpha] = useState<string>(props.alpha.toFixed(0));

  useEffect(() => setHue(Utility.resolveValue(props.hue, hue)), [props.hue]);
  useEffect(() => setSaturation(Utility.resolveValue(props.saturation * 100, saturation)), [props.saturation]);
  useEffect(() => setLightness(Utility.resolveValue(props.lightness * 100, lightness)), [props.lightness]);
  useEffect(() => setAlpha(Utility.resolveValue(props.alpha * 100, alpha)), [props.alpha]);

  return (
    <>
      <InputField className={"HSLA-input hue"} type={InputFieldType.TEL} label={"Hue"} input={hue} filter={Utility.number_filter} onInputChange={onHueChange}/>
      <InputField className={"HSLA-input saturation"} type={InputFieldType.TEL} label={"Saturation"} input={saturation} filter={Utility.number_filter} onInputChange={onSaturationChange}/>
      <InputField className={"HSLA-input value"} type={InputFieldType.TEL} label={"Lightness"} input={lightness} filter={Utility.number_filter} onInputChange={onLightnessChange}/>
      <InputField className={"HSLA-input alpha"} type={InputFieldType.TEL} label={"Alpha"} input={alpha} filter={Utility.number_filter} onInputChange={onAlphaChange}/>
    </>
  );

  function onHueChange(hue: string) {
    setHue(hue);
    updateColor(hue, saturation, lightness, alpha);
  }

  function onSaturationChange(saturation: string) {
    setSaturation(saturation);
    updateColor(hue, saturation, lightness, alpha);
  }

  function onLightnessChange(lightness: string) {
    setLightness(lightness);
    updateColor(hue, saturation, lightness, alpha);
  }

  function onAlphaChange(alpha: string) {
    setAlpha(alpha);
    updateColor(hue, saturation, lightness, alpha);
  }

  function updateColor(hue: string, saturation: string, lightness: string, alpha: string) {
    props.onChange(Utility.parseHue(hue), Utility.parseSVLA(saturation), Utility.parseSVLA(lightness), Utility.parseSVLA(alpha));
  }
}

export interface HSLAInputProps {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
  onChange(hue: number, saturation: number, lightness: number, alpha: number): void;
}

export default HSLAInput;
