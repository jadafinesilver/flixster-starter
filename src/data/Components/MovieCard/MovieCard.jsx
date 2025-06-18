import React, { useState } from 'react'
import './MovieCard.css'
import { ModuleCacheMap } from 'vite/runtime';

const MovieCard = ({title, rating, img , onClick}) => {
    const [favStatus, setFavStatus] = useState(false);
    const [watchStatus, setWatchStatus] = useState(false);
    const handleHeartClick = (e) => {
        e.stopPropagation();
        setFavStatus(prev => !prev);
    };
    const handleWatchClick = (e) => {
        e.stopPropagation();
        setWatchStatus(prev => !prev);
    };
    return (
        <>
        <div className="card" onClick={onClick}>
            <div className="img-container">
               
                {(img === "https://image.tmdb.org/t/p/w500null") ? (<img src="https://s3-eu-west-1.amazonaws.com/entertainmentie/uploads/2021/08/27144852/generic-movie-poster.jpg?w=170&h=257&q=high" alt="Fallback or Movie Poster" className="movie-img"/>) 
                : ( <img src={img} className="movie-img" alt="movie poster"/>)
                }
            </div>
            <div className="info">
                <div>
                    {title}
                </div>
                <div>
                    Rating : {rating.toFixed(1)}
                </div>
                
            </div>
            <div className='toggle-container'>
                <button onClick={handleWatchClick} className='watch'>{watchStatus ?  'watched' : 'watch'}</button>
                <span onClick={handleHeartClick} className="fav">{favStatus ? '★' : '☆'}</span> 
            </div>
        </div>

        </>
    );
};
export default MovieCard;