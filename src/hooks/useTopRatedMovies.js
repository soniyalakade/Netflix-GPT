import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";  

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const movies = useSelector((store) => store.movies.topRatedMovies);

    const getTopRatedMovies = async () => {
        try {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/top_rated',
            API_OPTIONS
        );

        const json = await data.json();
        dispatch(addTopRatedMovies(json.results));

        } catch (error) {
        console.error("Error fetching top rated movies:", error);
        }
    };

    useEffect(() => {
    if (!movies) getTopRatedMovies();
}, [movies]);
}

export default useTopRatedMovies;