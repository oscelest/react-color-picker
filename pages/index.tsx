import ColorPicker from "../src/components/ColorPicker";
import {useState, useEffect} from "react";

function IndexPage() {
  const [color, setColor] = useState<string>();

  useEffect(() => setColor("#333fffff"), []);

  return (
    <div style={{display: "flex"}}>
      <ColorPicker color={color} onChange={setColor}/>
    </div>
  )

}

export default IndexPage;
