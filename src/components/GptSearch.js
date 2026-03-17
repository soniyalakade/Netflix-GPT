import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { backgroundImage } from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
        <div className="absolute inset-0 -z-10">
               <div
                    className="w-full h-screen bg-cover bg-center"
                    style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
                >
                <div className="w-full h-full bg-black bg-opacity-70"></div>
            </div>
        </div>
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch;