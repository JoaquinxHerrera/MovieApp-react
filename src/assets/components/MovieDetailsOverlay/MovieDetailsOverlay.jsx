import PropTypes from "prop-types";

const MovieDetailsOverlay = ({ selectedMovie, closeOverlay }) => {
    const defaultImageSrc = "src/assets/imgs/movieDefault.png";
    
  return (
    <div className="overlay">
      <div className="overlayContent">
        <div className="overlayLeft">
            {selectedMovie.poster_path ? (
                <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={`Poster of ${selectedMovie.title}`} />
                ) : (
                    <img src={defaultImageSrc} alt="Default Poster" />
            )}
        </div>
        <div className="overlayRight">  
            <div className="topRight">
                <div className="topTitle">
                    <h2>{selectedMovie.title}</h2>
                    <button className="closeButton" onClick={closeOverlay}>X</button>
                </div>
                <div className="topLeft">
                    <div className="date">
                        <img src="src/assets/imgs/calendar.png" alt="" />
                        <span>{selectedMovie.release_date && new Date(selectedMovie.release_date).getFullYear()}</span>
                    </div>
                    -
                    <div className="rate">
                        <img src="src/assets/imgs/star.png" alt="" />
                        <p>{selectedMovie.vote_average && selectedMovie.vote_average.toFixed(1)}/10</p>
                    </div>
                </div> 
            </div>                     
                                                        
            <div className="rightMid">
                <p>{selectedMovie.overview}</p>
                {selectedMovie.genres && (
                    <div className="genreList"> Genres:
                    {selectedMovie.genres.map((genre, index) => (
                        <div key={index} className="genreItem">
                        {genre.name}
                        </div>
                    ))}
                    </div>
                )}
                <p className="duration">Duration: <span className="timeDuration">{selectedMovie.runtime} minutes</span></p>
            </div>
            <div className="rightBottom">
                <button className="favoritesBtn"><img src="src/assets/imgs/favorite.png" alt="" /> ADD TO FAVORITES</button>
                <button className="watchlistBtn"><img src="src/assets/imgs/watchlist.png" alt="" /> ADD TO WATCHLIST</button>
            </div>
        </div>
      </div>
    </div>
  );
};

MovieDetailsOverlay.propTypes = {
  selectedMovie: PropTypes.object.isRequired,
  closeOverlay: PropTypes.func.isRequired,
};

export default MovieDetailsOverlay;
