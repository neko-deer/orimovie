const baseImageUrl = 'https://image.tmdb.org/t/p';
const imageSize = 'w500';

export const getImageUrl = (path, size = imageSize) => `${baseImageUrl}/${size}/${path}`;