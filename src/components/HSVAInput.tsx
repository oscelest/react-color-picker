import {InputField, InputFieldType} from "@noxy/react-input-field";
import {useState, useEffect} from "react";
import HSVColor from "../modules/HSVColor";
import HexColor from "../modules/HexColor";

const filter = /^\d{0,3}$/;

function parseInput(input: string, max: number) {
  return Math.min(Math.max(parseInt(input), 0), max);
}

function HSVAInput(props: HSVAInputProps) {
  const [hue, setHue] = useState<string>("");
  const [saturation, setSaturation] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [alpha, setAlpha] = useState<string>("");
  const [previous_hex, setPreviousHex] = useState<string>("");

  useEffect(
    () => {
      if (props.hex === undefined || props.hex === previous_hex) return;
      const {hue, saturation, value, alpha, hex} = HexColor.toHSV(props.hex);
      setHue(hue.toFixed(0));
      setSaturation((saturation * 100).toFixed(0));
      setValue((value * 100).toFixed(0));
      setAlpha((alpha * 100).toFixed(0));
      setPreviousHex(hex);
    },
    [props.hex]
  );

  return (
    <>
      <InputField className={"hsva-input hue"} type={InputFieldType.TEL} label={"Hue"} input={hue} filter={filter} onInputChange={onHueChange}/>
      <InputField className={"hsva-input saturation"} type={InputFieldType.TEL} label={"Saturation"} input={saturation} filter={filter} onInputChange={onSaturationChange}/>
      <InputField className={"hsva-input value"} type={InputFieldType.TEL} label={"Value"} input={value} filter={filter} onInputChange={onValueChange}/>
      <InputField className={"hsva-input alpha"} type={InputFieldType.TEL} label={"Alpha"} input={alpha} filter={filter} onInputChange={onAlphaChange}/>
    </>
  );

  function onHueChange(hue: string) {
    setHue(hue);
    updateColor(hue, saturation, value, alpha);
  }

  function onSaturationChange(saturation: string) {
    setSaturation(hue);
    updateColor(hue, saturation, value, alpha);
  }

  function onValueChange(value: string) {
    setValue(hue);
    updateColor(hue, saturation, value, alpha);
  }

  function onAlphaChange(alpha: string) {
    setAlpha(hue);
    updateColor(hue, saturation, value, alpha);
  }

  function updateColor(hue: string, saturation: string, value: string, alpha: string) {
    const h = parseInput(hue, 360);
    const s = parseInput(saturation, 100);
    const v = parseInput(value, 100);
    const a = parseInput(alpha, 100);

    setHue(h.toFixed(0));
    setSaturation(s.toFixed(0));
    setValue(v.toFixed(0));
    setAlpha(a.toFixed(0));

    const hex = HSVColor.toHex(h, s / 100, v / 100, a / 100);
    setPreviousHex(hex);
    props.onChange(hex);
  }
}

export interface HSVAInputProps {
  hex?: string;
  onChange(hex?: string): void;
}

export default HSVAInput;
