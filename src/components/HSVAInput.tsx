import {InputField, InputFieldType} from "@noxy/react-input-field";
import {useState, useEffect, useRef} from "react";
import {asHex, fromHSV2RGB, fromHexToHSVA} from "../Utility";

const default_hue = 0;
const default_saturation = 100;
const default_value = 100;
const default_alpha = 100;

function HSVAInput(props: HSVAInputProps) {
  const [hue, setHue] = useState<number>();
  const [saturation, setSaturation] = useState<number>();
  const [value, setValue] = useState<number>();
  const [alpha, setAlpha] = useState<number>();
  const ref = useRef<HSVARef>();
  ref.current = {hue, saturation, value, alpha};

  useEffect(
    () => {
      const {hue, saturation, value, alpha} = fromHexToHSVA(props.hex);
      setHue(hue);
      setSaturation(saturation);
      setValue(value);
      setAlpha(alpha);
    },
    [props.hex]
  );

  const hue_input = hue ?? "";
  const saturation_input = saturation ?? "";
  const value_input = value ? Math.round(value / 2.55) : "";
  const alpha_input = alpha ? Math.round(alpha / 2.55) : "";

  return (
    <>
      <InputField className={"hsva-input hue"} type={InputFieldType.TEL} label={"Hue"} input={hue_input} onInputChange={onHueChange}/>
      <InputField className={"hsva-input saturation"} type={InputFieldType.TEL} label={"Saturation"} input={saturation_input} onInputChange={onSaturationChange}/>
      <InputField className={"hsva-input value"} type={InputFieldType.TEL} label={"Value"} input={value_input} onInputChange={onValueChange}/>
      <InputField className={"hsva-input alpha"} type={InputFieldType.TEL} label={"Alpha"} input={alpha_input} onInputChange={onAlphaChange}/>
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

  function onValueChange(input: string) {
    if (ref.current) {
      input = input.replace(/\D/, "");
      const value = Math.min(100, Math.max(0, parseInt(input) || default_value));
      setValue(input !== "" ? value : undefined);
      updateColor({...ref.current, value});
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
    if (color.hue === undefined && color.saturation === undefined && color.value === undefined && color.alpha === undefined) return props.onChange();
    let {hue = default_hue, saturation = default_saturation, value = default_value, alpha = default_alpha} = color;

    saturation /= 100;
    value /= 100;

    const red = fromHSV2RGB(hue, saturation, value, 5);
    const green = fromHSV2RGB(hue, saturation, value, 3);
    const blue = fromHSV2RGB(hue, saturation, value, 1);
    props.onChange(`#${asHex(red * 2.55)}${asHex(green * 2.55)}${asHex(blue * 2.55)}${asHex(alpha * 2.55)}`);
  }
}

interface HSVARef {
  hue?: number;
  saturation?: number;
  value?: number;
  alpha?: number;
}

export interface HSVAInputProps {
  hex?: string;
  onChange(hex?: string): void;
}

export default HSVAInput;
