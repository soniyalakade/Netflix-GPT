import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6">
      <h1 className="className=text-base md:text-xl py-3 text-white font-semibold">{title}</h1>

      <div className="flex overflow-x-auto scrollbar-hide">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>

    </div>
  );
};
export default MovieList;