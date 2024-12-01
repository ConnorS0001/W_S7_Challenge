import React from 'react'
import Home from './Home'
import Form from './Form'


/* MY CODE */ 
import {Routes, Route, Link } from "react-router-dom"; 
/* MY CODE */

function App() {
  return (
    <div id="app">
      <nav>
        <Link to="/">Home</Link>&nbsp;
        <Link to="/order">Order</Link>&nbsp;
        {/* NavLinks here */}
      </nav>
      {/* Route and Routes here */        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Form />} />
        </Routes>        
      }
    </div>
  )
}

export default App
