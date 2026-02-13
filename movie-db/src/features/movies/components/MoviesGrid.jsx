import MovieCard from "./MovieCard";

export default function MoviesGrid({ items }) {
  return (
    <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
}
