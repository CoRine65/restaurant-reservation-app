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
        <h2>Hours</h2>
        <div class="hours-list">
          <p><strong>Monday – Friday:</strong> 10:00 AM – 9:00 PM</p>
          <p><strong>Saturday:</strong> 11:00 AM – 10:00 PM</p>
          <p><strong>Sunday:</strong> Closed</p>
        </div>

      </div>

      <div className='contact-container'>
        <h2>Contact Us</h2>
        <div class="contact-info">
          <p><strong>Phone:</strong> (555) 123-4567</p>
          <p><strong>Email:</strong> hello@blossomcafe.com</p>
          <p><strong>Address:</strong> 123 Main Street, Springfield</p>
        </div>
      </div>


      
    </div>
  </main>

 );
}

export default App
