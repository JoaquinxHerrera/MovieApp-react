import PropTypes from 'prop-types';

const MovieCard = ({ movie, handleMovieClick }) => {
  const { title, poster_path} = movie;
  const defaultMovieImage = 'src/assets/imgs/movieDefault.png';

  return (
    <div className="movie" onClick={() => handleMovieClick(movie)}>
      <div className="movieOverlay">
        <img className="playButton" src="src/assets/imgs/playBtn.png" alt="" />
      </div>
      <img
        className="movieImage"
        src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : defaultMovieImage}
        alt={title}
      />
      <h2 className="movieTitle">{title}</h2>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    overview: PropTypes.string.isRequired,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  handleMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
