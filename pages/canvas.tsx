import { useEffect, useRef, useState } from "react";
import image_colors from "../public/images/pre_colors.json";
import CSS from "csstype";
import { stringify } from "querystring";
import { BooleanLiteral, NumberLiteralType } from "typescript";
import { match } from "assert";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [answer, setAnswer] = useState("");
  const [colors, setColors] = useState(initMap);

  function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      hex: hex,
      red: parseInt(result[1], 16),
      green: parseInt(result[2], 16),
      blue: parseInt(result[3], 16)
    } : null;
  }

  interface Color { 
    enable: boolean;
    red?:  number;
    blue?: number;
    green?: number;
    hex?: string
  }
  function initMap() {
    const colors = new Map<string,Color>();
    image_colors.colors.map((color) => colors.set( color, {enable: true, ...hexToRgb(color)}));
    console.log( 'image Colors ', image_colors);
    return colors;
  }

  
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value);
  }

  function handleClick(color: string) {
    const status = colors.get(color);
    if (status == undefined)
      return;
    status.enable = !status.enable;
    setColors(new Map(colors).set(color, status));
    console.log("set ", color);
  }


  function match(enabledColors: Map<string, Color>, red: number, green: number, blue:number ) {
    for (const [key, value] of enabledColors) {
      //console.log( 'Key ', key, value, ' red ' , red, 'g ', green, ' blue ', blue);
      if( value.red == red && value.blue == blue && value.green == green) {
        //console.log( 'true');
        return true;
      }
    }
    console.log( 'false' , ' red ', red , ' green' , green, 'blue', blue);

     return false;
  }
  useEffect(() => {
    console.log( 'useeffect');

    var ctx = canvasRef.current!.getContext("2d");

    const enabledColors = new Map( Array.from(colors).filter( ([key, value]) => value.enable));
    
    console.log( 'enabled colors ', enabledColors);

    var imageObj = new Image();

    imageObj.src = "/images/pre_full.png";
    imageObj.onload = () => {
      if (ctx) {
        ctx.drawImage(imageObj, 0, 0, 600, 600);
       

        var imgd = ctx.getImageData(0, 0, 600, 600);
        var data = imgd.data;

        // iterate over all pixels
        for (var i = 0, n = data.length; i < n; i += 4) {
          var red = data[i];
          var green = data[i + 1];
          var blue = data[i + 2];
          var alpha = data[i + 3];
          
         if (! match( enabledColors, red, green, blue)) {
             data[i] = 255;
            data[i + 1] = 255;
            data[i + 2] = 255;
         }
          
         
       
          
          }
        

        ctx.putImageData(imgd, 0, 0);
      } else {
        console.log(" context null");
      }
    };
  }, [colors]);

  return (
    <>
      <h1> Welcome to Dawdle 3!</h1>

      <form>
        <label>
          Answer:
          <input type="text" value={answer} onChange={handleChange} />{" "}
        </label>
        <input type="submit" value="Submit" />
      </form>

      {image_colors.colors.map((color) => (
        <button 
        key={color}
          style={{ backgroundColor: `#${color}` }}
          onClick={() => handleClick(color)}
        >
          {" "}
          {color}{" "}
        </button>
      ))}

      <canvas ref={canvasRef} width="600px" height="600px"></canvas>
    </>
  );
}

