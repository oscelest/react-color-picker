import React, {HTMLProps, useRef} from "react";
import Style from "./ColorPickerWindow.module.css";

export function ColorPickerWindow(props: ColorPickerWindowProps) {
  const {hue, x, y, className, ...component_method_props} = props;
  const {onChange, ...component_props} = component_method_props;
  
  const ref = useRef<HTMLDivElement>(null);
  
  const classes = [Style.Component, "color-picker-window"];
  if (className) classes.push(className);
  
  return (
    <div {...component_props} ref={ref} className={classes.join(" ")} onMouseDown={onMouseDown}>
      {renderBackground(hue)}
      {renderCursor(x, y)}
    </div>
  );
  
  
  function onMouseDown() {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }
  
  function onMouseMove(event: MouseEvent) {
    updateColor(event);
  }
  
  function onMouseUp(event: MouseEvent) {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
    updateColor(event);
  }
  
  function updateColor(event: MouseEvent) {
    if (!ref.current) throw new Error("Color cannot be updated - ColorPickerWindow component is missing.");
    
    const {scrollWidth, scrollHeight, offsetLeft, offsetTop, clientLeft, clientTop} = ref.current;
    const x = Math.max(0, Math.min(scrollWidth, event.pageX - offsetLeft - clientLeft));
    const y = Math.max(0, Math.min(scrollHeight, event.pageY - offsetTop - clientTop));
    props.onChange?.(x / scrollWidth * 100, y / scrollHeight * 100);
  }
}

function renderBackground(hue: number) {
  const style = {background: `hsla(${hue}deg, 100%, 50%, 100%)`};
  
  return (
    <div className={"color-picker-window-background"} style={style}/>
  );
}

function renderCursor(x?: number, y?: number) {
  if (typeof x !== "number" || isNaN(x) || typeof y !== "number" && isNaN(y)) return null;
  
  const style = {left: `${x}%`, top: `${y}%`};
  
  return (
    <div className={"color-picker-window-cursor"} style={style}/>
  );
}

export interface ColorPickerWindowProps extends Omit<HTMLProps<HTMLDivElement>, "onChange"> {
  hue?: number;
  x?: number;
  y?: number;
  onChange?(x: number, y: number): void;
}
