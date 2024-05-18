import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  
  const [movies, setmovies] = useState([]);
  const fetchHandler = ()=>{
    fetch('https://swapi.dev/api/films/').then(response=>{
      return response.json()
    }).then(data => {
      const transMovies = data.results.map(movieData=>{
        return {
          id:movieData.episode_id,
          title:movieData.title,
          releaseDate:movieData.release_date,
          openingText:movieData.opening_crawl
        };
      })
      setmovies(transMovies)
    })
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
