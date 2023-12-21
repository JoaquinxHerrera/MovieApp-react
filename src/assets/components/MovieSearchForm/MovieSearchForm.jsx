import PropTypes from 'prop-types'

const MovieSearchForm = ({ search, handleSubmit, handleInputChange }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Insert the name of the movie"
        value={search}
        onChange={handleInputChange}
      />
      <button type="submit" className="searchBtn">
        SEARCH
      </button>
    </form>
  );
};

MovieSearchForm.propTypes = {
    search: PropTypes.string.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default MovieSearchForm;

