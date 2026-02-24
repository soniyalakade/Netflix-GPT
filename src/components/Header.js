import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        navigate("/error");
      });
  };

  return (
    <div className='absolute top-0 left-0 w-full p-2 pl-32 flex items-center justify-between z-20'>
      
      <img 
        className='w-48 h-auto object-contain'
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-02-12/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
      />

      {user && (
        <div className='flex pr-4 items-center'>
          <img 
            className='w-12 h-12 ml-4 rounded-full'
            alt="userIcon"
            src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
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