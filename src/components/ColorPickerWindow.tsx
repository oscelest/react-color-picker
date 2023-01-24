import React, {useRef} from "react";

export function ColorPickerWindow(props: ColorPickerWindowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const style: React.CSSProperties = {background: `hsla(${props.hue}deg, 100%, 50%, 100%)`};

  return (
    <div ref={ref} className={"color-picker-window"} style={style} onMouseDown={onMouseDown}>
      {renderCursor()}
    </div>
  );

  function renderCursor() {
    if (props.x === undefined || props.y === undefined) return null;

    const style = {left: `${props.x}%`, top: `${props.y}%`};

    return (
      <div className={"color-picker-window-cursor"} style={style}/>
    );
  }

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
    if (!ref.current) return;
    const {scrollWidth, scrollHeight, offsetLeft, offsetTop, clientLeft, clientTop} = ref.current;
    const x = Math.max(0, Math.min(scrollWidth, event.pageX - offsetLeft - clientLeft));
    const y = Math.max(0, Math.min(scrollHeight, event.pageY - offsetTop - clientTop));
    props.onChange?.(x / scrollWidth * 100, y / scrollHeight * 100);
  }
}

export interface ColorPickerWindowProps {
  hue?: number;
  x?: number;
  y?: number;
  onChange?(x: number, y: number): void;
}
