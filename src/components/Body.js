import React, { use, useEffect } from 'react'
import Login from './Login';
import Browse from './Browse'; 
import Header from './Header'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { add } from 'firebase/firestore/pipelines';
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {
    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <>
            <Header />
            <Login />
            </>
        },
        {
            path: "/browse",
            element: <>
            <Header />
            <Browse />
            </>
        }
    ]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            const {uid, email, displayName} = user;
            dispatch(addUser({uid, email, displayName}));
            
        } else {
            dispatch(removeUser());
    
        }
        });
    }, []);

  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
};

export default Body;