import { useEffect } from "react";

function Movie() {

  const [movieList, setMovieList] = useState([]);

  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=afc035f8a9382b64084f0d247a29675f",
    )
      .then((res) => res.json())
      .then((json) => setMovieList(json.results));
  };

  useEffect(() => {
    getMovie();
  }, []);

  console.log(movieList);
  return (
    <div>
      {movieList.map(() => (
        <img src={`https://image.tmdb.org/t/p/w500/${movieList.poster_path}`} alt="movie poster" />
      ))}
    </div>
  );
}

export default Movie;
