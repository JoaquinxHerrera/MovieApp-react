import { useState, useEffect, useCallback } from "react";

import "./movieSearchStyle.css";
import MultipleSelectChip from "../select/MultipleSelectChip.jsx"
import MovieSearchForm from "../MovieSearchForm/MovieSearchForm.jsx";
import MovieList from "../MovieList/MovieList.jsx";
import MovieDetailsOverlay from "../MovieDetailsOverlay/MovieDetailsOverlay.jsx";
import Spinner from "../spinner/spinner";


const MovieSearcher = () => {
  const urlBase = 'https://api.themoviedb.org/3';
  const api_key = 'e25cdb95cf675bc05353541ff1df1195';   

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState('true')

  

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

  const fetchGenres = async () => {
    try {
        setLoading(true)
      const response = await fetch(`${urlBase}/genre/movie/list?api_key=${api_key}`);
      const data = await response.json();
      if (Array.isArray(data.genres)) {
        setGenres(data.genres);
      } else {
        console.error('La respuesta de la API no es una lista válida de géneros', data);
      }
    } catch (error) {
      console.error('An error has occurred while fetching genres', error);
    }finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    fetchGenres();
  }, [api_key]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchPopularMovies = useCallback(async () => {
    try {
        setLoading(true)
      const response = await fetch(`${urlBase}/movie/popular?api_key=${api_key}`);
      const data = await response.json();
      if (Array.isArray(data.results)) {
        setMovies(data.results);
      } else {
        console.error('La respuesta de la API no es un arreglo de películas populares válido', data);
      }
    } catch (error) {
      console.error('An error has occurred', error);
    }finally{
        setLoading(false)
    }      
  }, []);

  const fetchMoviesWithDelay = useCallback(async (pageNumber) => {
    try {
        setLoading(true)
        let endpoint = '/movie/popular';
        if (search) {
          endpoint = '/search/movie';
        }
    
        // Agrega el filtro de género si hay géneros seleccionados
        const genreFilter = selectedGenres.length > 0 ? `&with_genres=${selectedGenres.join(',')}` : '';

        const response = await fetch(`${urlBase}${endpoint}?api_key=${api_key}&page=${pageNumber}${search ? `&query=${search}` : ''}${genreFilter}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    
        const data = await response.json();
      if (Array.isArray(data.results)) {
        setMovies((prevMovies) => {
            // Si es una nueva búsqueda o la primera página, establece las nuevas películas.
            // De lo contrario, agrega las nuevas películas sin duplicados.
            return search || pageNumber === 1
              ? data.results
              : [...prevMovies, ...data.results.filter(newMovie => !prevMovies.some(existingMovie => existingMovie.id === newMovie.id))];
          });
          setPage(pageNumber);
      } else {
        console.error('La respuesta de la API no es un arreglo de películas válido', data);
      }
    } catch (error) {
      console.error('An error has occurred', error);
    }finally{
        setLoading(false)
    }
  }, [search, selectedGenres]);

  const handleSearch = useCallback(() => {
    fetchMoviesWithDelay(1);
  }, [fetchMoviesWithDelay]);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      handleSearch();
    }, 500); // Ajusta este valor según tus necesidades

    return () => clearTimeout(delayTimer);
  }, [search, handleSearch]);

  useEffect(() => {
    if (!search) {
      fetchPopularMovies();
    } else {
      fetchMoviesWithDelay(1);
    }
  }, [search, fetchMoviesWithDelay, fetchPopularMovies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      fetchPopularMovies();
    } else {
      fetchMoviesWithDelay(1);
    }
  };

  const handleLoadMore = () => {
    fetchMoviesWithDelay(page + 1);
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

  const handleChangeGenres = (event, genres) => {
    setGenres(genres);
  // Actualiza el estado de selectedGenres con un array de objetos
    setSelectedGenres(event.target.value);
  };

  return (
    <div className="movieSearch">
      <h1>Find your movie</h1>

      <MovieSearchForm
        search={search}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <div className="flex onlineMovies">
        <MultipleSelectChip
         genres={genres} 
         setGenres={setGenres} 
         selectedGenres={selectedGenres || []} 
         handleSearch={handleSearch} 
         handleChangeGenres={handleChangeGenres}/>
      </div>

      {loading && <Spinner/>}
      
      <MovieList movies={movies} handleMovieClick={handleMovieClick} />

      <button className="loadMore" type="button" onClick={handleLoadMore} disabled={movies.length === 0}>
        Load more movies
      </button>

      {selectedMovie && <MovieDetailsOverlay selectedMovie={selectedMovie} closeOverlay={closeOverlay} />}
    </div>
  );
};

export default MovieSearcher;