import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addTrendingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";  

const useTrendingMovies = () => {
    const dispatch = useDispatch();
    const movies = useSelector((store) => store.movies.trendingMovies);

    const getTrendingMovies = async () => {
        try {
        const data = await fetch(
            'https://api.themoviedb.org/3/trending/movie/day',
            API_OPTIONS
        );

        const json = await data.json();
        dispatch(addTrendingMovies(json.results));

        } catch (error) {
        console.error("Error fetching trending movies:", error);
        }
    };

    useEffect(() => {
    if (!movies) getTrendingMovies();
}, [movies]);
}

export default useTrendingMovies;