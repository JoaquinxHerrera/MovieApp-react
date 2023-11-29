import MovieCarousel from "../carousel/carousel.jsx";
import MovieSearcher from "../movieSearch/MovieSearcher.jsx";

function Home() {

  const movies = [
    { title: 'Película 1', poster: 'src/assets/imgs/endgameBanner.jpeg' },
    { title: 'Película 2', poster: 'src/assets/imgs/interestellarBanner.jpeg' },
    { title: 'Película 3', poster: 'src/assets/imgs/jawsBanner.jpeg' },
    { title: 'Película 3', poster: 'src/assets/imgs/napoleonBanner.jpeg' },
    { title: 'Película 3', poster: 'src/assets/imgs/oppenheimerBanner.jpeg' },
    { title: 'Película 3', poster: 'src/assets/imgs/spidermanBanner.jpeg' },
    // ... más películas
  ];

    return (
      <div>
        <MovieCarousel movies={movies} />
        <MovieSearcher />
      </div>
    );
  }
  
  export default Home;