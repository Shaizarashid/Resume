import React from 'react';

const MovieList = (props) => {
    const FavouriteComponent = props.favouriteComponent;
    return (
        <>
            {/*{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-1'>
					<img src={movie.Poster} alt='movie'></img>
                    <div onClick = {() => props.handleFavouritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
                        <FavouriteComponent/>
                    </div>
                </div>
			))}*/}

            {props.movies.map((movie, index) => (
                <div className='col-6 col-sm-4 col-md-3 col-lg-2 my-2'>
                    <div className='image-container'>
                        <img src={movie.Poster} alt='movie' />
                        <div onClick={() => props.handleFavouritesClick(movie)} className='overlay d-flex align-items-center justify-content-center'>
                            <FavouriteComponent />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default MovieList;