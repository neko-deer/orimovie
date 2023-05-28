import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './shared/MovieCard';
import MovieDetail from './shared/MovieDetail';

const MovieUpComing = () => {
  const [upComingMovies, setUpComingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchUpComingMovies = async () => {
      try {
        const response = await axios.get(`movie/upcoming`, {
          params: {
            page: 1,
            languange: 'en-US',
          },
        });
        setUpComingMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUpComingMovies();
  }, []);

  return (
    <div style={{ marginTop: '100px' }}>
      <div className="title">
        <span>Upcoming Movies</span>
      </div>
      <div className="trending-movie-container mt-5">
        {upComingMovies.map((movie) => (
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

export default MovieUpComing;
