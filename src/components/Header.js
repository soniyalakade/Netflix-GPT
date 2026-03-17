import React from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice'; 
import { logo, SUPPORTED_LANGUAGES } from '../utils/constants';
import { photoURL } from '../utils/constants'; 
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from "../utils/config";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

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

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleGptSearchClick = () =>{
    dispatch(toggleGptSearchView())
  }

  return (
    <div className='absolute top-0 left-0 w-full p-2 pl-32 flex items-center justify-between z-20 bg-gradient-to-b from-black via-black/60 to-transparent'>
      
      <img 
        className='w-48 h-auto object-contain'
        src={logo}
        alt="Netflix Logo"
      />

      {user && (
        <div className='flex pr-4 items-center '>

          {showGptSearch && (<select
            className='bg-gray-500 flex m-2 py-1 md:py-2 px-2 md:px-6 text-xl rounded-lg'
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>
                {lang.name}
              </option>
            ))}
          </select>)}

          <button
            className='bg-red-600 text-white py-1 md:py-2 px-2 md:px-6 text-xl rounded-lg hover:bg-opacity-50'
            onClick={handleGptSearchClick}
          >
            {showGptSearch? "Home Page" : "GPT Search"}
          </button>

          <img 
            className='w-12 h-12 ml-4 rounded-full'
            alt="userIcon"
            src={user?.photoURL || photoURL}
          />

          <button 
            onClick={handleSignOut} 
            className='bg-red-600 m-2 text-white py-1 md:py-2 px-2 md:px-6 text-xl  rounded-lg hover:bg-opacity-50'
          >
            Sign Out
          </button>
        </div>
      )}

    </div>
  );
};

export default Header;