import React from 'react'
import pizza from './images/pizza.jpg'

import {useNavigate,  } from "react-router-dom";


function Home() {
  //MY CODE
  const navigate = useNavigate();
  //MY CODE
  
  return (
    <div>
      <h2>
        Welcome to Bloom Pizza!
      </h2>
      {/* clicking on the img should navigate to "/order" */}
      <img alt="order-pizza" onClick={() => navigate("/order")} style={{ cursor: 'pointer' }} src={pizza} />
    </div>
  )
}

export default Home
