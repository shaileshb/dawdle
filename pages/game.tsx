import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CSS from 'csstype';
import { useState, MouseEvent } from 'react';
// import React, { MouseEvent } from 'react';

export default function App() {

  const [purple, setPurple] = useState(false);
  const [yellow, setYellow] = useState(false);

  const imageStyle: CSS.Properties = {
    width: "100%",
  height: "100%",
  position: "absolute",
  top: "0",
  left: "0",
  };

  function showPurple(e:MouseEvent<HTMLButtonElement>) {
    purple? setPurple(false): setPurple(true);
    e.preventDefault();
    console.log('You clicked purple.');
  }

  function showYellow(e:MouseEvent<HTMLButtonElement>) {
    yellow? setYellow(false): setYellow(true);

    e.preventDefault();
    console.log('You clicked yellow.');
  }
  return (
    <>
        <h1> Welcome to Dawdle 2!</h1>

    <button onClick={showPurple}> Show Purple </button>
    <button onClick={showYellow}> Show Yellow</button>

  <div style={{ backgroundColor:'blue', width:  '800px', height: '800px', position: 'relative'
   }} >
   { purple && <img style={imageStyle} src="/1-with-purple-.png"/>}
   { yellow && <img style={imageStyle} src="/1-with-yellow-.png"/> }

  </div></>
  )
}
