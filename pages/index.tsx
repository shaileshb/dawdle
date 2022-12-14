import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import CSS from 'csstype';
import { useState, MouseEvent, useEffect, useRef } from 'react';
import WhatIsDawdle from './WhatIsDawdle';
import App from './game';

export default function Home() {

  const [showWhatIsDawdle, setShowWhatIsDawdle] = useState(false);

  useEffect(() => {
    const show =  localStorage.getItem('showWelcome')
    show && setShowWhatIsDawdle( JSON.parse(show));

    
  }, []);
  
  return (
    <>
    { showWhatIsDawdle && <WhatIsDawdle/>}
    { !showWhatIsDawdle && <App/>}

        </>
  )
}
