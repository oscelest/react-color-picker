import {InputField, InputFieldType} from "@noxy/react-input-field";
import React, {useState, useEffect} from "react";
import Utility from "../modules/Utility";

function HSLAInput(props: HSLAInputProps) {
  const [hue, setHue] = useState<string>(props.hue.toFixed(0));
  const [saturation, setSaturation] = useState<string>((props.saturation * 100).toFixed(0));
  const [lightness, setLightness] = useState<string>((props.lightness * 100).toFixed(0));
  const [alpha, setAlpha] = useState<string>((props.alpha * 100).toFixed(0));

  useEffect(() => setHue(Utility.resolveValue(props.hue, hue)), [props.hue]);
  useEffect(() => setSaturation(Utility.resolveValue(props.saturation * 100, saturation)), [props.saturation]);
  useEffect(() => setLightness(Utility.resolveValue(props.lightness * 100, lightness)), [props.lightness]);
  useEffect(() => setAlpha(Utility.resolveValue(props.alpha * 100, alpha)), [props.alpha]);

  return (
    <>
      <InputField className={"color-picker-input hsla-hue"} type={InputFieldType.TEL} label={"H"} input={hue} filter={Utility.number_filter}
                  onInputChange={onHueChange} onCommit={onCommit}/>
      <InputField className={"color-picker-input hsla-saturation"} type={InputFieldType.TEL} label={"S"} input={saturation} filter={Utility.number_filter}
                  onInputChange={onSaturationChange} onCommit={onCommit}/>
      <InputField className={"color-picker-input hsla-lightness"} type={InputFieldType.TEL} label={"L"} input={lightness} filter={Utility.number_filter}
                  onInputChange={onLightnessChange} onCommit={onCommit}/>
      <InputField className={"color-picker-input hsla-alpha"} type={InputFieldType.TEL} label={"A"} input={alpha} filter={Utility.number_filter}
                  onInputChange={onAlphaChange} onCommit={onCommit}/>
    </>
  );

  function onHueChange(hue: string) {
    updateColor(hue, saturation, lightness, alpha);
  }

  function onSaturationChange(saturation: string) {
    updateColor(hue, saturation, lightness, alpha);
  }

  function onLightnessChange(lightness: string) {
    updateColor(hue, saturation, lightness, alpha);
  }

  function onAlphaChange(alpha: string) {
    updateColor(hue, saturation, lightness, alpha);
  }

  function onCommit() {
    updateColor((props.hue).toFixed(0), (props.saturation * 100).toFixed(0), (props.lightness * 100).toFixed(0), (props.alpha * 100).toFixed(0));
  }

  function updateColor(hue: string, saturation: string, lightness: string, alpha: string) {
    setHue(hue);
    setSaturation(saturation);
    setLightness(lightness);
    setAlpha(alpha);
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
