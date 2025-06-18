import React, {useState, useEffect} from 'react'
import MovieList from '../MovieList/MovieList';
import './Modal.css';

const Modal = ({show, onClose, movie}) => {
    if (show === false) return null;
    return (
        <>
        <div className="modal"> {onClose}
            <div className="content" onClick={(e) => e.stopPropagation()}>
                <div>
                    <div onClick={onClose} className="close">X</div>
                </div>
                <div className="body">
                    {!movie ? (
                    <p>Loading....</p>
                    ) : (
                    <div>
                        <div className="title">
                            <h3>{movie.title}</h3>
                        </div>
                        <div className="duration">
                            <p> Runtime : {movie.runtime} Minutes
                            </p>
                        </div>
                        
                            <div className="image-container">
                                <div className="image">
                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie poster"/>
                                </div>
                            </div>
                        
                        <div className="date">Released : {movie.release_date}</div>
                        <div className="genre">
                            {movie.genres.map((g) => g.name).join(", ")}
                        </div>
                        <div className="description">{movie.overview}</div>
                    </div>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}
export default Modal;