import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";  

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const movies = useSelector((store) => store.movies.popularMovies);

    const getPopularMovies = async () => {
        try {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/popular?page=2',
            API_OPTIONS
        );

        const json = await data.json();
        dispatch(addPopularMovies(json.results));

        } catch (error) {
        console.error("Error fetching popular movies:", error);
        }
    };

    useEffect(() => {
    if (!movies) getPopularMovies();
}, [movies]);
}

export default usePopularMovies;