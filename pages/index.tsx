import {useEffect, useState} from "react";
import {ColorPicker} from "../src";

function IndexPage() {
  const [color, setColor] = useState<string>();
  
  useEffect(() => setColor("#facadeff"), []);
  
  return (
    <div style={{display: "flex"}}>
      <ColorPicker value={color} onChange={setColor}/>
    </div>
  );
  
}

export default IndexPage;
