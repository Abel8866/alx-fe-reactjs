import React, { useEffect } from "react";

function Movie() {
  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=afc035f8a9382b64084f0d247a29675f",
    )
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <h1>Movie</h1>
    </div>
  );
}

export default Movie;
