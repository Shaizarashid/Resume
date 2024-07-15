import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import './index.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setfavourites] = useState([]);
  const [searchValue, setsearchValue] =useState('Avengers');

  const getMovieRequest = async (searchValue) =>{
    const url =  `http://www.omdbapi.com/?s=${searchValue}&apikey=5ec428f5`;
  
    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
    
  };

  
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setfavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};
  

  const addFavouriteMovie = (movie) =>{

    const isMovieInFavourites = favourites.find((favMovie) => favMovie.imdbID === movie.imdbID);

    if (!isMovieInFavourites) {
        const newFavouriteList = [...favourites, movie];
        setfavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
    } 
  }

  const removeFavouriteMovie = (movie) =>{
    const newFavouriteList = favourites.filter((favourite) => 
      favourite.imdbID !== movie.imdbID
    );

    setfavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'Movies'/>
        <SearchBox searchValue={searchValue} setsearchValue={setsearchValue}/>
      </div>
      <div className='row'>
        <MovieList movies={movies} 
                   handleFavouritesClick= {addFavouriteMovie}
                   favouriteComponent={AddFavourites} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'Favourites'/>
      </div>
      <div className='row'>
        <MovieList movies={favourites} 
                   handleFavouritesClick= {removeFavouriteMovie}
                   favouriteComponent={RemoveFavourites} />
      </div>

    </div>
  );
}

export default App;
