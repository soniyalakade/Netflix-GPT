import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice'; 
import { logo } from '../utils/constants';
import { photoURL } from '../utils/constants'; 

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            const {uid, email, displayName, photoURL} = user;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            navigate("/browse");
        } else {
            dispatch(removeUser());
            navigate("/");
        }
        });
        return () => unsubscribe();
    }, []);

  return (
    <div className='absolute top-0 left-0 w-full p-2 pl-32 flex items-center justify-between z-20'>
      
      <img 
        className='w-48 h-auto object-contain'
        src={logo}
        alt="Netflix Logo"
      />

      {user && (
        <div className='flex pr-4 items-center'>
          <img 
            className='w-12 h-12 ml-4 rounded-full'
            alt="userIcon"
            src={user?.photoURL || photoURL}
          />
          <button 
            onClick={handleSignOut} 
            className='px-2 py-2 ml-4 text-sm font-semibold text-white'
          >
            Sign Out
          </button>
        </div>
      )}

    </div>
  );
};

export default Header;