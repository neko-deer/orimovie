import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/shared/MovieCard';
import MovieDetail from '../../components/shared/MovieDetail';
import SeachBox from '../../components/shared/SearchBox';

const TvSeries = () => {
  const [series, setSeries] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.get(`search/tv?query=${searchQuery}`);
      setSeries(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get(`discover/tv`);
        setSeries(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <div style={{ marginTop: '100px' }}>
      <div className="title">
        <span>TV Series</span>
      </div>
      <SeachBox
        onSearch={handleSearch}
        placeholder={'Enter a TV Series Title'}
      />
      <div className="trending-movie-container">
        {series.map((serie) => (
          <MovieCard
            setSelectedMovie={setSelectedMovie}
            movie={serie}
            key={serie.id}
          ></MovieCard>
        ))}
      </div>
      <MovieDetail movie={selectedMovie} />
    </div>
  );
};

export default TvSeries;
