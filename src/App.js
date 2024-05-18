import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  
  const [movies, setmovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function fetchHandler() {
    setIsLoading(true)
    setError(null);
    try{
    const response = await fetch('https://swapi.dev/api/films/');
    if(!response.ok){
      throw new Error('Something Went Wrong');
    }
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
    } catch(error){
      setError(error.message);
    }
    
    setIsLoading(false)
  }

  let content = <p>No Movies Found</p>
  if(movies.length>0){
    content = <MoviesList movies={movies}/>;
  }
  if(error){
    content = <p>{error}</p>
  }
  if(isLoading){
    content = <p>Loading page...</p>;
  }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
