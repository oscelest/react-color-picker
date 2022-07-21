import {InputField, InputFieldType} from "@noxy/react-input-field";
import {asHex, fromHexToHSLA, fromHSL2Red, fromHSL2Green, fromHSL2Blue} from "../Utility";
import {useState, useEffect} from "react";

const filter = /\d{0,3}/;

function parseInput(input: string, max: number) {
  return Math.min(max, Math.max(0, +input));
}

function HSLAInput(props: HSLAInputProps) {
  const [hue_input, setHueInput] = useState<string>("");
  const [saturation_input, setSaturationInput] = useState<string>("");
  const [lightness_input, setLightnessInput] = useState<string>("");
  const [alpha_input, setAlphaInput] = useState<string>("");
  const {hue, saturation, lightness, alpha} = fromHexToHSLA(props.hex);

  useEffect(
    () => {
      const {hue, saturation, lightness, alpha} = fromHexToHSLA(props.hex);
      setHueInput(String(hue ?? ""));
      setSaturationInput(String(saturation ?? ""));
      setLightnessInput(String(lightness ?? ""));
      setAlphaInput(String(alpha ?? ""));
    },
    [props.hex]
  );

  return (
    <>
      <InputField className={"hsla-input hue"} type={InputFieldType.TEL} label={"Hue"} input={hue_input} filter={filter} onInputChange={onHueChange}/>
      <InputField className={"hsla-input saturation"} type={InputFieldType.TEL} label={"Saturation"} input={saturation_input} filter={filter} onInputChange={onSaturationChange}/>
      <InputField className={"hsla-input lightness"} type={InputFieldType.TEL} label={"Lightness"} input={lightness_input} filter={filter} onInputChange={onLightnessChange}/>
      <InputField className={"hsla-input alpha"} type={InputFieldType.TEL} label={"Alpha"} input={alpha_input} filter={filter} onInputChange={onAlphaChange}/>
    </>
  );

  function onHueChange(hue: string) {
    setHueInput(hue);
    if (hue) return updateColor(parseInput(hue, 360), saturation, lightness, alpha);
    if (!hue && saturation === undefined && lightness === undefined && alpha === undefined) props.onChange();
  }

  function onSaturationChange(saturation: string) {
    setSaturationInput(saturation);
    if (saturation) return updateColor(hue, parseInput(saturation, 100), lightness, alpha);
    if (hue === undefined && !saturation && lightness === undefined && alpha === undefined) props.onChange();
  }

  function onLightnessChange(lightness: string) {
    setLightnessInput(lightness);
    if (lightness) return updateColor(hue, saturation, parseInput(lightness, 100), alpha);
    if (!hue && saturation === undefined && !lightness && alpha === undefined) props.onChange();
  }

  function onAlphaChange(alpha: string) {
    setAlphaInput(alpha);
    if (alpha) return updateColor(hue, saturation, lightness, parseInput(alpha, 100));
    if (hue === undefined && saturation === undefined && lightness === undefined && !alpha) props.onChange();
  }

  function updateColor(hue: number = 0, saturation: number = 100, lightness: number = 50, alpha: number = 100) {
    saturation /= 100;
    lightness /= 100;
    const red = fromHSL2Red(hue, saturation, lightness);
    const green = fromHSL2Green(hue, saturation, lightness);
    const blue = fromHSL2Blue(hue, saturation, lightness);
    props.onChange(`#${asHex(red)}${asHex(green)}${asHex(blue)}${asHex(alpha * 2.55)}`);
  }
}

export interface HSLAInputProps {
  hex?: string;
  onChange(hex?: string): void;
}

export default HSLAInput;
