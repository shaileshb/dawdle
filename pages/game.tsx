import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import CSS from "csstype";
import { useState, MouseEvent, SyntheticEvent } from "react";
import image_colors from "../public/images/pre_colors.json";

export default function App() {
  const [answer, setAnswer] = useState("");
  const [colors, setColors] = useState(initMap);

  function initMap()  {
       const colors = new Map();
       image_colors.colors.map( (color) => colors.set( color, false));
        return colors;
  }


  const imageStyle: CSS.Properties = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: "0",
  };


  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer(event.target.value);
  }
  
  function handleClick( color: string) {
    const currentVal = colors.get(color); 
    setColors( new Map(colors).set( color, !currentVal)) ;  
    console.log('set ' , color)
  }
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

      {image_colors.colors.map( (color ) =>  <button style={{ backgroundColor: `#${color}`}} onClick={() => handleClick(color)}> {color} </button> )}
      <div
        style={{ 
    width:'800px',
    height:'800px',
    // maxWidth: '800px',
    // maxHeight:'800px',
          position: "relative",
        }}
      >
      {image_colors.colors.map( (color ) =>  { 

        return colors.get( color) &&
         <img src={`/images/pre_${color}.png`} style={imageStyle}/>} )
      }

      </div>
    </>
  );
}
