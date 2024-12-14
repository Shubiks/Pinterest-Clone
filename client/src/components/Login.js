import React , { useEffect } from 'react'
import shareVideo from "../assets/share.mp4"
import { GoogleLogin ,GoogleOAuthProvider } from '@react-oauth/google';
import { FcGoogle} from "react-icons/fc";
import { gapi } from "gapi-script";
import { jwtDecode } from "jwt-decode";
import {client} from "../client";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    gapi.load('client:auth2', () =>{
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
        scope: 'profile'
      });
    })
    },[]);
  const responseGoogle = (response)=>{
    // Get the token from the response
  const token = response.credential;
  
  // Decode the token to get the user information
  const decoded = jwtDecode(token);

  // Extract necessary information from the decoded token
  const { name, sub: googleId, picture: imageUrl } = decoded;

  // Store user information in local storage
  localStorage.setItem("user", JSON.stringify({ name, googleId, imageUrl }));

  // Create a document object with the user information
  const doc = {
    _id: googleId,
    _type: 'user',
    userName: name,
    image: imageUrl
  };

  console.log(doc);
  // You can now use the 'doc' object to save the user in your database (Sanity.io)
  client.createIfNotExists(doc).then(() =>{
    navigate("/",{replace: true})
  })
  }
  return (
    
    <div className ="flex justify-start items-center flex-col h-screen">
      <div className='relative w-full h-full'>
      <video 
        src ={shareVideo}
        type ="video/mp4"
        loop
        controls ={false}
        muted
        autoPlay
        className='w-full h-full object-cover'
      />

      <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
        <div className='shadow-2xl'>
       

        <GoogleOAuthProvider clientId ={process.env.REACT_APP_GOOGLE_API_TOKEN}>
          <GoogleLogin 
          render={(renderprops)=>(
            <button
            type='button'
            className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer  outline-none'
            onClick={renderprops.onClick}
            disabled={renderprops.disabled}
            >
              <FcGoogle className='mr-4' /> Sign in with google
            </button>

          )}
          onSuccess= {responseGoogle}
          onFailure = {responseGoogle}
          cookiePolicy="single_host_origin"
          />
        </GoogleOAuthProvider>
        </div>
      </div>
    </div>
    </div>
  )
}
export default Login