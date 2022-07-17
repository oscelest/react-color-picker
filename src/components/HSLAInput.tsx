import {InputField, InputFieldType} from "@noxy/react-input-field";
import {useState, useEffect, useRef} from "react";
import {asHex, fromHexToHSLA, fromHSL2RGB} from "../Utility";

const default_hue = 0;
const default_saturation = 100;
const default_lightness = 50;
const default_alpha = 100;

function HSLAInput(props: HSLAInputProps) {
  const [hue, setHue] = useState<number>();
  const [saturation, setSaturation] = useState<number>();
  const [lightness, setLightness] = useState<number>();
  const [alpha, setAlpha] = useState<number>();
  const ref = useRef<HSVARef>();
  ref.current = {hue, saturation, lightness, alpha};

  useEffect(
    () => {
      const {hue, saturation, lightness, alpha} = fromHexToHSLA(props.hex);
      setHue(hue);
      setSaturation(saturation);
      setLightness(lightness);
      setAlpha(alpha);
    },
    [props.hex]
  );

  return (
    <>
      <InputField className={"hsva-input hue"} type={InputFieldType.TEL} label={"Hue"} input={hue ?? ""} onInputChange={onHueChange}/>
      <InputField className={"hsva-input saturation"} type={InputFieldType.TEL} label={"Saturation"} input={saturation ?? ""} onInputChange={onSaturationChange}/>
      <InputField className={"hsva-input lightness"} type={InputFieldType.TEL} label={"Lightness"} input={lightness ?? ""} onInputChange={onLightnessChange}/>
      <InputField className={"hsva-input alpha"} type={InputFieldType.TEL} label={"Alpha"} input={alpha ?? ""} onInputChange={onAlphaChange}/>
    </>
  );

  function onHueChange(input: string) {
    if (ref.current) {
      input = input.replace(/\D/, "");
      const hue = Math.min(360, Math.max(0, parseInt(input) || default_hue));
      setHue(input !== "" ? hue : undefined);
      updateColor({...ref.current, hue});
    }
  }

  function onSaturationChange(input: string) {
    if (ref.current) {
      input = input.replace(/\D/, "");
      const saturation = Math.min(100, Math.max(0, parseInt(input) || default_saturation));
      setSaturation(input !== "" ? saturation : undefined);
      updateColor({...ref.current, saturation});
    }
  }

  function onLightnessChange(input: string) {
    if (ref.current) {
      input = input.replace(/\D/, "");
      const lightness = Math.min(100, Math.max(0, parseInt(input) || default_lightness));
      setLightness(input !== "" ? lightness : undefined);
      updateColor({...ref.current, lightness});
    }
  }

  function onAlphaChange(input: string) {
    if (ref.current) {
      input = input.replace(/\D/, "");
      const alpha = Math.min(100, Math.max(0, parseInt(input) || default_alpha));
      setAlpha(input !== "" ? alpha : undefined);
      updateColor({...ref.current, alpha});
    }
  }

  function updateColor(color: HSVARef) {
    if (color.hue === undefined && color.saturation === undefined && color.lightness === undefined && color.alpha === undefined) return props.onChange();
    let {hue = default_hue, saturation = default_saturation, lightness = default_lightness, alpha = default_alpha} = color;

    saturation /= 100;
    lightness /= 100;

    const red = fromHSL2RGB(hue, saturation, lightness, 0);
    const green = fromHSL2RGB(hue, saturation, lightness, 8);
    const blue = fromHSL2RGB(hue, saturation, lightness, 4);
    props.onChange(`#${asHex(red * 2.55)}${asHex(green * 2.55)}${asHex(blue * 2.55)}${asHex(alpha * 2.55)}`);
  }
}

interface HSVARef {
  hue?: number;
  saturation?: number;
  lightness?: number;
  alpha?: number;
}

export interface HSLAInputProps {
  hex?: string;
  onChange(hex?: string): void;
}

export default HSLAInput;
