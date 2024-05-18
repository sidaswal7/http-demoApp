import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  
  const [movies, setmovies] = useState([]);
  async function fetchHandler() {
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json()
    const transMovies = data.results.map(movieData=>{
      return {
        id:movieData.episode_id,
        title:movieData.title,
        releaseDate:movieData.release_date,
        openingText:movieData.opening_crawl
      };
    })
    setmovies(transMovies)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
