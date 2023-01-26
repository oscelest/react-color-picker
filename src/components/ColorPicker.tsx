import {InputField, InputFieldChangeEvent, InputFieldEventType} from "@noxy/react-input-field";
import {Range} from "@noxy/react-range";
import React, {useEffect, useState} from "react";
import {HexColor, HSLColor, HSVColor, RGBColor, Utility} from "../modules";
import Style from "./ColorPicker.module.css";
import {ColorPickerWindow, HexInput, HSLAInput, HSVAInput, RGBAInput} from "./index";

export function ColorPicker(props: ColorPickerProps) {
  const {style = {}, value, children, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const [previous_hex, setPreviousHex] = useState<string>("#facadeff");
  const [type, setType] = useState<number>(0);
  const [color, setColor] = useState<HSVColor.Definition>(HexColor.toHSVA(previous_hex));
  
  // Input specific state values
  const [type_input, setTypeInput] = useState<[string, number]>([Utility.color_type_list[type], type]);
  
  useEffect(
    () => {
      if (!value || previous_hex === value) return;
      setColor(HexColor.toHSVA(value));
      setPreviousHex(value);
    },
    [value]
  );
  
  const hex = previous_hex ?? value;
  const preview_color: React.CSSProperties = {background: hex};
  
  const classes = [Style.Component, "color-picker"];
  if (className) classes.push(className);
  
  const {red, green, blue} = HexColor.toRGBA(hex);
  style["--range-alpha-background"] = `${red}, ${green}, ${blue}`;
  
  return (
    <div {...component_props} className={classes.join(" ")} style={style}>
      <div className={"color-picker-control"}>
        <Range className={"color-picker-range-hue"} vertical={true} value={color.hue} min={0} max={360} onChange={onHueChange}/>
        <Range className={"color-picker-range-alpha"} vertical={true} value={color.alpha * 100} min={0} max={100} onChange={onAlphaChange}/>
      </div>
      <ColorPickerWindow hue={color.hue} x={color.saturation * 100} y={100 - color.value * 100} onChange={onWindowChange}/>
      <div className={"color-picker-preview"} style={preview_color}/>
      <div className={"color-picker-info"}>
        <InputField className={"color-picker-input color-picker-type"} label={"Type"} max={3} useCaret={true} value={type_input[0]} index={type_input[1]} onChange={onTypeChange}>
          {Utility.color_type_list}
        </InputField>
        {renderInput()}
      </div>
    </div>
  );
  
  function renderInput() {
    switch (type) {
      case 1: {
        // RGBA values are (0-255, 0-255, 0-255, 0-100)
        return (
          <RGBAInput value={HSVColor.toRGB(color)} onChange={onRGBChange}/>
        );
      }
      case 2:
        // HSVA values are (0-360, 0-1, 0-1, 0-1)
        return (
          <HSVAInput value={color} onChange={onHSVAChange}/>
        );
      case 3: {
        // HSLA values are (0-360, 0-1, 0-1, 0-1)
        return (
          <HSLAInput value={HSVColor.toHSL(color)} onChange={onHSLAChange}/>
        );
      }
      default:
        // Hex value is (#0f0f0f0f)
        return (
          <HexInput hex={hex} onChange={onHexChange}/>
        );
    }
  }
  
  function onTypeChange(event: InputFieldChangeEvent) {
    if (event.type === InputFieldEventType.COMMIT || event.type === InputFieldEventType.RESET) {
      setType(event.index);
    }
    setTypeInput([event.value, event.index]);
  }
  
  function onHueChange(hue: number) {
    updateColor({...color, hue});
  }
  
  function onAlphaChange(alpha: number) {
    updateColor({...color, alpha: alpha / 100});
  }
  
  function onWindowChange(x: number, y: number) {
    updateColor({...color, saturation: x / 100, value: 1 - y / 100});
  }
  
  // HSVA values are (0-360, 0-1, 0-1, 0-1)
  function onHSVAChange(color: HSVColor.Definition) {
    updateColor(color);
  }
  
  // HSLA values are (0-360, 0-1, 0-1, 0-1)
  function onHSLAChange(color: HSLColor.Definition) {
    updateColor(HSLColor.toHSV(color));
  }
  
  // RGBA values are (0-255, 0-255, 0-255, 0-100)
  function onRGBChange(color: RGBColor.Definition) {
    updateColor(RGBColor.toHSVA(color));
  }
  
  // Hex value is (#0f0f0f0f)
  function onHexChange(hex: string) {
    updateColor(HexColor.toHSVA(hex));
  }
  
  function updateColor(color: HSVColor.Definition) {
    const hex = HSVColor.toHex(color);
    setColor(color);
    setPreviousHex(hex);
    props.onChange?.(hex);
  }
}

type ColorPickerStyleProps = React.CSSProperties & {"--range-alpha-background"?: string}

export interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children" | "style"> {
  value?: string;
  style?: ColorPickerStyleProps;
  children?: never;
  onChange?(hex?: string): void;
}
