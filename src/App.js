import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  
  const [movies, setmovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  async function fetchHandler() {
    setIsLoading(true)
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
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>No Movies Found</p>}
        {isLoading && <p>Page loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
