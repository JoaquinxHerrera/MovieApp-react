import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GenreSelect = ({ urlBase, apiKey, onChange, selectedGenres, setSelectedGenres, loading }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${urlBase}/genre/movie/list?api_key=${apiKey}`);
        const data = await response.json();
        if (Array.isArray(data.genres)) {
          setGenres(data.genres);
        } else {
          console.error('La respuesta de la API no es una lista válida de géneros', data);
        }
      } catch (error) {
        console.error('An error has occurred while fetching genres', error);
      }
    };

    fetchGenres();
  }, [urlBase, apiKey]);

  const handleGenreChange = (genreId) => {
    setSelectedGenres((prevGenres) => {
      const updatedGenres = prevGenres.includes(genreId)
        ? prevGenres.filter(id => id !== genreId)
        : [...prevGenres, genreId];

      return updatedGenres;
    });
  };

  useEffect(() => {
    onChange(selectedGenres);
  }, [selectedGenres, onChange]);

  return (
    <div>
      <h3>Selecciona tus géneros:</h3>
      {loading ? (
        <p>Cargando géneros...</p>
      ) : (
        <select
          multiple
          value={selectedGenres.map(String)}
          onChange={(e) => handleGenreChange(e.target.value)}
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

GenreSelect.propTypes = {
  urlBase: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedGenres: PropTypes.array.isRequired,
  setSelectedGenres: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default GenreSelect;
