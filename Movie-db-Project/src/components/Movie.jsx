import { useEffect, useState } from "react";

function Movie() {
  const [movieList, setMovieList] = useState([]);

  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=afc035f8a9382b64084f0d247a29675f",
    )
      .then(res => res.json())
      .then(json => setMovieList(json.results));
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movieList);
  return (
    <div>
      {movieList.map((movie) =>
        movie?.poster_path ? (
          <img
            style={{ width: "280px", height: "250px", marginLeft: "10px", marginTop: "20px" }}
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title ?? "movie poster"}
          />
        ) : null,
      )}
    </div>
  );
}

export default Movie;
