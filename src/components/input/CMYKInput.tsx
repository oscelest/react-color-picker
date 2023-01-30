import {CMYKColor, HSVColor} from "@noxy/color";
import {InputField, InputFieldChangeEvent, InputFieldType} from "@noxy/react-input-field";
import React, {HTMLProps, useEffect, useState} from "react";
import Utility from "../../modules/Utility";
import Style from "./HSVInput.module.css";

export function CMYKInput(props: CMYKInputProps) {
  const {color, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const classes = [Style.Component, "color-picker-cmyk-input"];
  if (className) classes.push(className);
  
  const [cyan, setCyan] = useState<string>(Utility.toIntString(color.cyan));
  const [magenta, setMagenta] = useState<string>(Utility.toPercentageString(color.magenta));
  const [yellow, setYellow] = useState<string>(Utility.toPercentageString(color.yellow));
  const [black, setBlack] = useState<string>(Utility.toPercentageString(color.black));
  const [alpha, setAlpha] = useState<string>(Utility.toPercentageString(color.alpha));
  
  useEffect(
    () => {
      setCyan(Utility.toIntString(color.cyan));
      setMagenta(Utility.toPercentageString(color.magenta));
      setYellow(Utility.toPercentageString(color.yellow));
      setBlack(Utility.toPercentageString(color.black));
      setAlpha(Utility.toPercentageString(color.alpha));
    },
    [color]
  );
  
  return (
    <div {...component_props} className={classes.join(" ")}>
      <InputField className={"cmyk-cyan"} type={InputFieldType.TEL} label={"C"} value={cyan} filter={Utility.number_filter} onChange={onCyanChange}/>
      <InputField className={"cmyk-magenta"} type={InputFieldType.TEL} label={"M"} value={magenta} filter={Utility.number_filter} onChange={onMagentaChange}/>
      <InputField className={"cmyk-yellow"} type={InputFieldType.TEL} label={"Y"} value={yellow} filter={Utility.number_filter} onChange={onYellowChange}/>
      <InputField className={"cmyk-black"} type={InputFieldType.TEL} label={"K"} value={black} filter={Utility.number_filter} onChange={onBlackChange}/>
      <InputField className={"cmyk-alpha"} type={InputFieldType.TEL} label={"A"} value={alpha} filter={Utility.number_filter} onChange={onAlphaChange}/>
    </div>
  );
  
  function onCyanChange(event: InputFieldChangeEvent) {
    setCyan(event.value);
    onChange(new CMYKColor(Utility.parseDecimal(event.value), color.magenta, color.yellow, color.black, color.alpha).toHSV());
  }
  
  function onMagentaChange(event: InputFieldChangeEvent) {
    setMagenta(event.value);
    onChange(new CMYKColor(color.cyan, Utility.parseDecimal(event.value), color.yellow, color.black, color.alpha).toHSV());
  }
  
  function onYellowChange(event: InputFieldChangeEvent) {
    setYellow(event.value);
    onChange(new CMYKColor(color.cyan, color.magenta, Utility.parseDecimal(event.value), color.black, color.alpha).toHSV());
  }
  
  function onBlackChange(event: InputFieldChangeEvent) {
    setAlpha(event.value);
    onChange(new CMYKColor(color.cyan, color.magenta, color.yellow, Utility.parseDecimal(event.value), color.alpha).toHSV());
  }
  
  function onAlphaChange(event: InputFieldChangeEvent) {
    setAlpha(event.value);
    onChange(new CMYKColor(color.cyan, color.magenta, color.yellow, color.black, Utility.parseDecimal(event.value)).toHSV());
  }
}

export interface CMYKInputProps extends Omit<HTMLProps<HTMLDivElement>, "color" | "onChange"> {
  color: CMYKColor;
  onChange(value: HSVColor): void;
}
