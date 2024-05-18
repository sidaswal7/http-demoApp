import React, {useEffect, useState, useCallback} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  
  const [movies, setmovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchHandler = useCallback(async ()=> {
    setIsLoading(true)
    setError(null);
    try{
    const response = await fetch('https://react-movies-f6af7-default-rtdb.firebaseio.com/movies.json');
    if(!response.ok){
      throw new Error('Something Went Wrong');
    }
    const data = await response.json()
    console.log(data);
    const loadedMovies = [];

    for(let key in data){
      loadedMovies.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate

      })
    }

    setmovies(loadedMovies)
    } catch(error){
      setError(error.message);
    }
    
    setIsLoading(false)
  },[])
  useEffect(()=>{
    fetchHandler()
  },[fetchHandler])

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
  const addMovieHandler = async(movie)=>{
    try{
      const response = await fetch('https://react-movies-f6af7-default-rtdb.firebaseio.com/movies.json',{
        method:"POST",
        body: JSON.stringify(movie),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json();
      console.log(data);
    } catch (error){
      setError(error.message);
    }
  }


  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler}/>
      </section>
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
