import React from 'react'
import Header from './Header';
import { useState } from 'react';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
    
        setIsSignInForm(!isSignInForm);
    
    };

  return (
    <div>
        <Header />
        <div className='absolute'>
            <img src = "https://assets.nflxext.com/ffe/siteui/vlv3/4371a395-0e42-46ae-be36-5755eebc638b/web/IN-en-20260209-TRIFECTA-perspective_3a6d8659-ddfe-4547-9584-dce64c02c230_large.jpg" alt="Netflix Background"></img>
        </div>
    
        <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 z-10 flex flex-col text-white bg-opacity-80 rounded-md'>
        <h1 className='font-bold text-3xl py-3 pt-0'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {isSignInForm && (<><input type="text" placeholder="Username" className='p-2 m-2 bg-gray-800' /><input type="text" placeholder="Phone Number" className='p-2 m-2 bg-gray-800'></input></>)
            }
            <input type ="text" placeholder="Email Address" className='p-2 m-2 bg-gray-800'/>
            <input type ="password" placeholder="Password" className='p-2 m-2 bg-gray-800'/>
            <button className='bg-red-600 px-2 py-2 m-2 rounded-md'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
            <p className='py-4 flex cursor-pointer' onClick={toggleSignInForm} >{isSignInForm ? "New to Netflix? Sign Up Now" : "Already have an account? Sign In Now"}</p>
        </form>

    </div>
  );
};

export default Login;