import Slider from 'react-slick';
import PropTypes from 'prop-types';
import "./carouselCardStyle.css"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const MovieCarousel = ({ movies }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: 'linear',
  };

  return (
    <div className='carousel'>
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div  key={index}>
            <img src={movie.poster} alt={movie.title} />
            {/* <h3>{movie.title}</h3> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

MovieCarousel.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      
    })
  ).isRequired,
}

export default MovieCarousel;