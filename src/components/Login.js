import React, { useRef } from 'react'
import Header from './Header';
import { useState } from 'react';
import { checkValidaData } from '../utils/validate';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const email = useRef(null);
    const name = useRef(null);
    const password = useRef(null);
    const phoneNumber = useRef(null);

    const handleButtonClick = () => {

        let message;

        if (isSignInForm) {
            message = checkValidaData(
                email.current.value,
                password.current.value,
                true
            );
        } else {
            message = checkValidaData(
                email.current.value,
                password.current.value,
                false,
                name.current.value,
                phoneNumber.current.value
            );
        }

        setErrorMessage(message);

        if (message !== true) return;

        if (!isSignInForm) {
            createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
            )
            .then((userCredential) => {
                const user = userCredential.user;
            
            updateProfile(user, {
            displayName: name.current.value, photoURL: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }).then(() => {
                const {uid, email, displayName, photoURL} = auth.currentUser;
                dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
                navigate("/browse");
            }).catch((error) => {
                setErrorMessage("Profile update failed. Please try again.");
            });
                
            })
            .catch((error) => {
                if (error.code === "auth/email-already-in-use") {
                    setErrorMessage("This email is already registered. Please sign in.");
                } else if (error.code === "auth/weak-password") {
                    setErrorMessage("Password should be at least 6 characters.");
                } else {
                    setErrorMessage("Something went wrong. Try again.");
                }
                });

        } else {
            signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
            )
            .then((userCredential) => {
                console.log("User signed in:", userCredential.user);
                navigate("/browse");
            })
            .catch((error) => {
                console.log("Sign In Error:", error.code);

                switch (error.code) {
                    case "auth/invalid-credential":
                    setErrorMessage("Invalid email or password.");
                    break;

                    case "auth/too-many-requests":
                    setErrorMessage("Too many failed attempts. Try again later.");
                    break;

                    default:
                    setErrorMessage("Something went wrong. Please try again.");
                }

                });
        }
        };

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);    
    };

  return (
    <div>
        <Header />
        <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 -z-10">
                <div
                    className="w-full h-screen bg-cover bg-center"
                    style={{
                    backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/4371a395-0e42-46ae-be36-5755eebc638b/web/IN-en-20260209-TRIFECTA-perspective_3a6d8659-ddfe-4547-9584-dce64c02c230_large.jpg")`
                    }}
                >
                    <div className="w-full h-full bg-black bg-opacity-70"></div>
                </div>
            </div>
        </div>

        <form onSubmit={(e) => {
            e.preventDefault();
        }} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 z-10 flex flex-col text-white bg-opacity-80 rounded-md'>
        <h1 className='font-bold text-3xl py-3 pt-0'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm && (<>
            <input type="text" placeholder="Username" className='p-2 m-2 bg-gray-800' ref={name}/>
            <input 
            type="text" 
            placeholder="Phone Number" 
            className='p-2 m-2 bg-gray-800'
            ref={phoneNumber}
            /> </>)
            }
            <input  ref={email} type ="text" placeholder="Email Address" className='p-2 m-2 bg-gray-800'/>
            <input ref={password} type ="password" placeholder="Password" className='p-2 m-2 bg-gray-800'/>
            <p className='text-red-600 font-semibold text-lg'>{errorMessage}</p>
            
            <button 
            type="submit"
            onClick={handleButtonClick}
            className='bg-red-600 px-2 py-2 m-2 rounded-md'
            >
            {isSignInForm ? "Sign In" : "Sign Up"}
            </button>     

            <p className='py-4 flex cursor-pointer' onClick={toggleSignInForm} >{isSignInForm ? "New to Netflix? Sign Up Now" : "Already have an account? Sign In Now"}</p>
        </form>

    </div>
  );
};

export default Login;