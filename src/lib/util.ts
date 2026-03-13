export const getMovieImageUrl = (path: string | null, size: string = 'w500'): string => {
    if (!path) return '/placeholder-image.jpg';
    return `https://image.tmdb.org/t/p/${size}${path}`;
};