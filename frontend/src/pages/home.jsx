import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";


const Home = () => {
  

  return (
    <div className="relative h-screen bg-gray-100">
      <div className="mt-3 relative z-0">
        <Outlet />
        <h1>hello from home</h1>
      </div>
    </div>
  );
 

  
};

export default Home;
