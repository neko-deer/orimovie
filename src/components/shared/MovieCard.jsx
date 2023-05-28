import { getImageUrl } from '../../services/baseImageService';
import notFoundImage from '../../assets/not-found-image.jpg';

const MovieCard = ({ movie, setSelectedMovie }) => {
  const handleImageError = (event) => {
    event.target.src = notFoundImage;
  };

  const posterUrl = getImageUrl(movie.poster_path);

  return (
    <div>
      <div
        key={movie.id}
        className="movie-card"
        onClick={() => {
          setSelectedMovie(movie);
        }}
      >
        <img
          loading="lazy"
          src={posterUrl}
          alt={movie.title}
          onError={handleImageError}
        />

        <h3>{movie.title ?? movie.name}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
