import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";  

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const movies = useSelector((store) => store.movies.nowPlayingMovies);

    const getNowPlayingMovies = async () => {
        try {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/now_playing",
            API_OPTIONS
        );

        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));

        } catch (error) {
        console.error("Error fetching now playing movies:", error);
        }
    };

    React.useEffect(() => {
        getNowPlayingMovies();
    }, []);
}

export default useNowPlayingMovies;