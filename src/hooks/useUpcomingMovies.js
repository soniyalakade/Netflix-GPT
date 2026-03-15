import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";  

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const movies = useSelector((store) => store.movies.upcomingMovies);

    const getUpcomingMovies = async () => {
        try {
        const data = await fetch(
            'https://api.themoviedb.org/3/movie/upcoming',
            API_OPTIONS
        );

        const json = await data.json();
        dispatch(addUpcomingMovies(json.results));

        } catch (error) {
        console.error("Error fetching upcoming movies:", error);
        }
    };

    useEffect(() => {
    if (!movies) getUpcomingMovies();
}, [movies]);
}

export default useUpcomingMovies;