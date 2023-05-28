import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getImageUrl } from '../../services/baseImageService';
import Disqus from 'disqus-react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../../pages/movie/css/movies.css';

const MovieDetail = ({ movie }) => {
  const [selectedMovie, setSelectedMovie] = useState(movie);
  const [showPopup, setShowPopup] = useState(movie ? true : false);
  const [watchlist, setWatchlist] = useState([]);

  const disqusShortname = 'orimovie';
  const disqusConfig = {
    url: 'http://localhost:3000',
    identifier: movie ? movie.id : '',
    title: movie ? movie.title : '',
  };

  // Manage watchlist
  const url = window.location.href;

  const addToWatchlist = () => {
    const updateWatchList = [...watchlist, movie];
    setWatchlist(updateWatchList);
    localStorage.setItem('watchlist', JSON.stringify(updateWatchList));
  };

  const removeFromWatchlist = () => {
    const updateWatchList = watchlist.filter(
      (list) => list.id !== movie.id || list.title !== movie.title
    );
    setWatchlist(updateWatchList);
    localStorage.setItem('watchlist', JSON.stringify(updateWatchList));

    if (url.includes('watchlist')) {
      handleClosePopup();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const isAddedToWatchlist =
    movie &&
    watchlist.some(
      (watchlistMovie) =>
        watchlistMovie.id === movie.id && watchlistMovie.title === movie.title
    );

  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('watchlist'));
    if (savedWatchlist) {
      setWatchlist(savedWatchlist);
    }
  }, []);

  // Handle movie details
  useEffect(() => {
    setSelectedMovie(movie);
    if (movie) {
      handleMovieDetails(movie.id, movie.title ? 'movie' : 'tv');
    }
  }, [movie]);

  const handleMovieDetails = async (movieId, category = 'movie') => {
    try {
      const response = await axios.get(`${category}/${movieId}`, {
        params: {
          append_to_response: 'credits,similar,videos',
        },
      });
      const data = response.data;
      setSelectedMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleClosePopup = () => {
    setSelectedMovie(null);
  };

  // Handle click outside of popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      const popupContent = document.querySelector('.popup-content-mov');
      if (popupContent && !popupContent.contains(event.target)) {
        handleClosePopup();
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {selectedMovie && (
        <div className="popup-overlay-mov">
          <div className="popup-content-mov">
            <button className="close-button" onClick={handleClosePopup}>
              Close
            </button>
            <img
              className="popup-mov-poster rounded"
              src={getImageUrl(selectedMovie.poster_path)}
              alt={selectedMovie.title}
            />
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <h2>{selectedMovie.title}</h2>
              {isAddedToWatchlist ? (
                <Button
                  variant="danger"
                  className="d-inline-flex align-items-center gap-2"
                  onClick={() => removeFromWatchlist()}
                >
                  <span>Remove from Watchlist</span>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    style={{ color: '#ffffff' }}
                  />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="d-inline-flex align-items-center gap-2"
                  onClick={() => addToWatchlist()}
                >
                  <span>Add to Watchlist</span>
                  <FontAwesomeIcon icon={faCirclePlus} />
                </Button>
              )}
            </div>
            <p>{selectedMovie.overview}</p>
            <div className="movie-meta">
              <div>
                Release Date: <span>{selectedMovie.release_date}</span>
              </div>
              <div>
                Vote Average: <span>{selectedMovie.vote_average}</span>
              </div>
            </div>
            {selectedMovie.videos &&
              selectedMovie.videos.results.length > 0 && (
                <div className="trailer-container">
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${selectedMovie.videos.results[0].key}`}
                    title="Trailer"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            <h3>Cast:</h3>
            <ul className="list-actor">
              {selectedMovie.credits &&
                selectedMovie.credits.cast.slice(0, 5).map((cast) => (
                  <li key={cast.id}>
                    <img
                      className="cast-profile-image"
                      src={getImageUrl(cast.profile_path)}
                      alt={cast.name}
                    />
                    <div>{cast.name}</div>
                  </li>
                ))}
            </ul>

            <Disqus.DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />

            <h3>Similar Movies:</h3>
            <div className="similar-movies">
              {selectedMovie.similar &&
                selectedMovie.similar.results.slice(0, 5).map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => handleMovieDetails(movie.id)}
                  >
                    <img
                      className="similar-movie-poster"
                      src={getImageUrl(movie.poster_path)}
                      alt={movie.title}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
