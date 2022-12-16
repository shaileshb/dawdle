import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CSS from 'csstype';
import { useState } from 'react';
// import React, { MouseEvent } from 'react';
import { useRouter } from 'next/router'

export default function WhatIsDawdle() {
  const [showNextTime, setshowNextTime] = useState(false);
  const router = useRouter()

  function handleSubmit(event: React.SyntheticEvent) {
       event.preventDefault();
       localStorage.setItem('showWelcome', showNextTime.toString() )
       router.push("/game")
  }
  return (
    <>
        <h1> Welcome to Dawdle !</h1>
        <p> What is dawdle? </p>
        <p> This is dictionary definition - </p>

        <img width="400" src="/dawdle-dictionary-defination.png" alt="whatisdawdle"/>
        <p> Waste Time on Fun Games! </p>
        <br/>
        <form onSubmit={handleSubmit}>
        <label>
        <input type="checkbox" checked={showNextTime}
          onChange={ () => setshowNextTime(!showNextTime)} />
        Show this next time.
      </label>
  
  <input type="submit" value="Submit"/>
</form>
   </>
  )
}
