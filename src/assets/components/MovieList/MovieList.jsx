import PropTypes from "prop-types";
import MovieCard from "../MovieCard/MovieCard";

const MovieList = ({ movies, handleMovieClick }) => {
  return (
    <div className="movieList">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} handleMovieClick={handleMovieClick} /> 
      ))}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  handleMovieClick: PropTypes.func.isRequired,
};

export default MovieList;