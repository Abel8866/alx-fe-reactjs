import { Link } from "react-router-dom";
import { paths } from "../../../routes/paths";

function getYear(releaseDate) {
  if (!releaseDate) return "";
  const year = String(releaseDate).slice(0, 4);
  return /^\d{4}$/.test(year) ? year : "";
}

export default function MovieCard({ movie }) {
  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : null;

  const year = getYear(movie?.release_date);
  const rating =
    typeof movie?.vote_average === "number" ? movie.vote_average : null;

  return (
    <li className="rounded border bg-white overflow-hidden hover:shadow-sm transition-shadow">
      <Link to={paths.movieDetails(movie.id)} className="block">
        <div className="aspect-[2/3] bg-gray-100">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie?.title || "Movie poster"}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xs text-gray-500">
              No poster
            </div>
          )}
        </div>

        <div className="p-3">
          <div className="font-semibold leading-snug line-clamp-2">
            {movie?.title}
          </div>

          <div className="mt-1 flex items-center justify-between gap-2 text-sm text-gray-600">
            <span>{year || "—"}</span>
            {rating !== null ? <span>{rating.toFixed(1)} / 10</span> : null}
          </div>
        </div>
      </Link>
    </li>
  );
}
