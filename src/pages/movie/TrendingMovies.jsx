import React, { useState, useEffect } from 'react';
import './css/trendingMovies.css';
import MovieCard from '../../components/shared/MovieCard';
import MovieDetail from '../../components/shared/MovieDetail';

const TrendingMovies = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [trendingTVSeries, setTrendingTVSeries] = useState([]);
  const [trailerLink, setTrailerLink] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=0dedff94fec76ae248f29be9ab984eab`
        );
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    const fetchTrendingTVSeries = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/tv/week?api_key=0dedff94fec76ae248f29be9ab984eab`
        );
        const data = await response.json();
        setTrendingTVSeries(data.results);
      } catch (error) {
        console.error('Error fetching trending TV series:', error);
      }
    };

    fetchTrendingMovies();
    fetchTrendingTVSeries();
  }, []);

  useEffect(() => {
    const fetchTrailerLink = async (movieId) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=0dedff94fec76ae248f29be9ab984eab`
        );
        const data = await response.json();
        let trailerKey = '';
        for (let i = 0; i < data.results.length; i++) {
          if (
            data.results[i].type === 'Trailer' ||
            data.results[i].type === 'Teaser'
          ) {
            trailerKey = data.results[i].key;
            break;
          }
        }
        if (trailerKey) {
          const trailerLink = `https://www.youtube.com/watch?v=${trailerKey}`;
          setTrailerLink(trailerLink);
        } else {
          setTrailerLink('');
        }
      } catch (error) {
        console.error('Error fetching trailer link:', error);
      }
    };

    const carouselInterval = setInterval(() => {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex === trendingMovies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    fetchTrailerLink(trendingMovies[currentMovieIndex]?.id);

    return () => {
      clearInterval(carouselInterval);
    };
  }, [currentMovieIndex, trendingMovies]);

  const currentMovie = trendingMovies[currentMovieIndex];

  const handleClosePopup = () => {
    setSelectedMovie(null);
    setShowPopup(false);
  };

  return (
    <div>
      {currentMovie && (
        <div className="movie-carousel">
          <img
            className="movie-carousel-image"
            src={`https://image.tmdb.org/t/p/w1280/${currentMovie.backdrop_path}`}
            alt={currentMovie.title}
          />
          <div className="movie-carousel-overlay">
            <div className="movie-details">
              <h3>{currentMovie.title}</h3>
              <p>{currentMovie.overview}</p>
              <div className="button-container">
                <button
                  className="details-button"
                  onClick={() => setSelectedMovie(currentMovie)}
                >
                  Details
                </button>
                {trailerLink && (
                  <button
                    className="trailer-button"
                    onClick={() => window.open(trailerLink, '_blank')}
                  >
                    Watch Trailer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="trending-movies-header">
        <h2>Trending Movies</h2>
      </div>
      <div className="trending-movies-container">
        {trendingMovies.slice(0, 5).map((movie) => (
          <MovieCard
            setSelectedMovie={setSelectedMovie}
            movie={movie}
            key={movie.id}
          ></MovieCard>
        ))}
      </div>

      <div className="trending-tv-series-header">
        <h2>Trending TV Series</h2>
      </div>
      <div className="trending-tv-series-container">
        {trendingTVSeries.slice(0, 5).map((series) => (
          <MovieCard
            setSelectedMovie={setSelectedMovie}
            movie={series}
            key={series.id}
          ></MovieCard>
        ))}
      </div>
      <MovieDetail movie={selectedMovie} />
    </div>
  );
};

export default TrendingMovies;
