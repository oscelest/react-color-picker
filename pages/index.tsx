import {ColorPicker} from "../src";
import {useState, useEffect} from "react";

function IndexPage() {
  const [color, setColor] = useState<string>();

  useEffect(() => setColor("#FACADEFF"), []);

  return (
    <div style={{display: "flex"}}>
      <ColorPicker value={color} onChange={setColor}/>
    </div>
  )

}

export default IndexPage;
