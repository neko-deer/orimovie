import { useEffect, useState } from 'react';
import MovieCard from '../../components/shared/MovieCard';
import MovieDetail from '../../components/shared/MovieDetail';
import '../movie/css/movies.css';

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist'));
    if (savedWatchlist) {
      setWatchlist(savedWatchlist);
    }
  }, []);

  return (
    <div style={{ marginTop: '100px', minHeight: '100vh' }}>
      <div className="title">
        <span>Watchlist</span>
      </div>
      {watchlist.length > 0 ? (
        <div className="trending-movie-container mt-5">
          {watchlist.map((movie) => (
            <MovieCard
              setSelectedMovie={setSelectedMovie}
              movie={movie}
              key={movie.id}
            />
          ))}
        </div>
      ) : (
        <div
          className="container-fluid h-100 text-center text-light"
          style={{ marginTop: '3rem' }}
        >
          <span>Oops! Your watchlist is empty.</span>
        </div>
      )}
      <MovieDetail movie={selectedMovie} />
    </div>
  );
};

export default WatchList;
