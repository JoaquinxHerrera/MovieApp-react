import { useState, useEffect, useCallback } from "react";
import "./movieSearchStyle.css";
import MultipleSelectChip from "../select/MultipleSelectChip.jsx"

const MovieSearcher = () => {
  const urlBase = 'https://api.themoviedb.org/3';
  const api_key = 'e25cdb95cf675bc05353541ff1df1195';

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = async (movie) => {
    try {
      const response = await fetch(`${urlBase}/movie/${movie.id}?api_key=${api_key}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const movieDetails = await response.json();
      setSelectedMovie(movieDetails);
    } catch (error) {
      console.error('An error has occurred while fetching movie details', error);
    }
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchPopularMovies = useCallback(async () => {
    try {
      const response = await fetch(`${urlBase}/movie/popular?api_key=${api_key}`);
      const data = await response.json();
      if (Array.isArray(data.results)) {
        setMovies(data.results);
      } else {
        console.error('La respuesta de la API no es un arreglo de películas populares válido', data);
      }
    } catch (error) {
      console.error('An error has occurred', error);
    }
  }, []);

  const fetchMovies = useCallback(async (pageNumber) => {
    try {
      let endpoint = '/movie/popular';
      if (search) {
        endpoint = '/search/movie';
      }

      const response = await fetch(`${urlBase}${endpoint}?api_key=${api_key}&page=${pageNumber}${search ? `&query=${search}` : ''}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      if (Array.isArray(data.results)) {
        setMovies((prevMovies) => {
            const uniqueMovies = data.results.filter((newMovie) => !prevMovies.some((prevMovie) => prevMovie.id === newMovie.id));
            return pageNumber === 1
              ? [...uniqueMovies.map((movie, index) => ({ ...movie, key: `${movie.id}-${index}` }))]
              : [...prevMovies, ...uniqueMovies.map((movie, index) => ({ ...movie, key: `${movie.id}-${prevMovies.length + index}` }))];
          });
        setPage(pageNumber);
      } else {
        console.error('La respuesta de la API no es un arreglo de películas válido', data);
      }
    } catch (error) {
      console.error('An error has occurred', error);
    }
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      fetchPopularMovies();
    } else {
      fetchMovies(1);
     
    }
  };

  const handleLoadMore = () => {
    fetchMovies(page + 1);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, [fetchPopularMovies]);

 

  const closeOverlay = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  const handleOverlayClick = useCallback((e) => {
    if (e.target.classList.contains("overlay")) {
      closeOverlay();
    }
  }, [closeOverlay]);

  useEffect(() => {
    window.addEventListener("click", handleOverlayClick);

    return () => {
      window.removeEventListener("click", handleOverlayClick);
    };
  }, [selectedMovie, handleOverlayClick]);

  return (
    <div className="movieSearch">
      <h1>Find your movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Insert the name of the movie'
          value={search}
          onChange={handleInputChange}
        />
        <button type='submit' className="searchBtn">SEARCH</button>

        <div className="flex onlineMovies">
            <MultipleSelectChip></MultipleSelectChip>
        </div>
        <div className='movieList'>
          {movies.map((movie) => (
            <div key={movie.id} className='movie' onClick={() => handleMovieClick(movie)}>
                <div className="movieOverlay">
                    <img className='playButton' src="src/assets/imgs/playBtn.png" alt="" />
                </div>
              <img className='movieImage'src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h2 className="movieTitle">{movie.title}</h2>
            </div>
          ))}
        </div>
        <button className="loadMore" type="button" onClick={handleLoadMore} disabled={movies.length === 0}> Load more movies</button>
      </form>
      {selectedMovie && (
            <div className="overlay">
                <div className="overlayContent">
                    <div className="overlayLeft">
                        <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={`Poster of ${selectedMovie.title}`} />
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
        )}
    </div>
  );
};

export default MovieSearcher;