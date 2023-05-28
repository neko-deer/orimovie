import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieCard from '../../components/shared/MovieCard';
import { Link } from 'react-router-dom';
import MovieDetail from '../../components/shared/MovieDetail';
import SeachBox from '../../components/shared/SearchBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './css/movies.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get(`search/movie?query=${searchQuery}`);
      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`discover/movie`);
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div style={{ marginTop: '100px' }}>
      <div className="title">
        <span>Movies</span>
      </div>
      <SeachBox onSearch={handleSearch} placeholder={'Enter a Movie Title'} />
      <div className="d-flex justify-content-end w-100 up-coming-btn">
        <Link to={'/movies/upcoming'} style={{ textDecoration: 'none' }}>
          <div className="d-flex gap-2 align-items-center">
            <span className="fw-semibold text-light">Upcoming</span>
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ color: '#ffffff', fontSize: '20px' }}
              beatFade
            />
          </div>
        </Link>
      </div>
      <div className="trending-movie-container">
        {movies.map((movie) => (
          <MovieCard
            setSelectedMovie={setSelectedMovie}
            movie={movie}
            key={movie.id}
          />
        ))}
      </div>
      <MovieDetail movie={selectedMovie} />
    </div>
  );
};

export default MoviesPage;
