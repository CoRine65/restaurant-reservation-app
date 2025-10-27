//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Carousel from './Carousel';

function App() {
 return (
  <main className='app-container'>
      <h1>Restaurant </h1>
  
    <div className='carousel-container'>
      <Carousel />
    </div>

    <div className='bottom-row'>
      <div className='hours-container'>
        hours
      </div>

      <div className='contact-container'>
        contact
      </div>
    </div>
  </main>

 );
}

export default App
