import React, { useEffect } from 'react';
import { Routes, Route , useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { fetchUser } from './utils/fetchUser';
const App = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    const User = fetchUser();
    if(!User){
      navigate("/login")
    }
  },[])
 
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  )
}

export default App