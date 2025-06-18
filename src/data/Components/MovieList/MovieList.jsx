import React, {useState, useEffect} from 'react';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';
import Modal from '../Modal/Modal';
import LoadMore from '../LoadMore/LoadMore';
import Header from '../Header/Header'
import axios from "axios";

// to access the api
const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3/movie";

// start of the component
const MovieList = ({searchTerm , sortParam, submitTerm} ) => {
    const [movies, SetMovies] = useState([]);
    const [showModal, SetShowModal] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [page, SetPage] = useState(1);

    // fetch list 
    useEffect( () => {
        const fetchList = async () => {
            try {
                let url ='';
                if (sortParam) {
                    if (sortParam === "default") {
                        url = `${BASE_URL}/now_playing?api_key=${API_KEY}`;
                    } else {
                        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sortParam}&page=${page}&include_adult=false`;     
                    }
                } else if (submitTerm) {
                const submitted = submitTerm
                 url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(submitted)}&page=${page}`;
       
            }   else {
                    url = `${BASE_URL}/now_playing?api_key=${API_KEY}`;
                }
                const { data } = await axios.get(
                    url
                );
                SetMovies(data.results); 
            } catch (err) {
                console.error("error fetching list: ", err);
            }
        };
        fetchList();
    }, [sortParam, submitTerm]);  
  

    // load more functionality 
    const handleLoadClick = async () => {
        try {
            const nextPage = page + 1;
            // same logic as in fetchlist
            let url ='';
                if (sortParam) {
                    if (sortParam === "default") {
                        url = `${BASE_URL}/now_playing?api_key=${API_KEY}&page=${nextPage}`
                    } else {
                        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=${sortParam}&page=${nextPage}&include_adult=false`;     
                    }
                } else if (submitTerm) {
                const submitted = submitTerm
                 url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(submitted)}&page=${nextPage}`;
            }   else {
                    url = `${BASE_URL}/now_playing?api_key=${API_KEY}&page=${nextPage}`
                }
                const { data } = await axios.get(
                    url
                );
            SetMovies(prevMovies => [...prevMovies, ...data.results]);
            SetPage(nextPage);
        } catch (err) {
            console.error("error loading ", err);
        }
    };

    // open modal
    const handleMovieClick = async (MovieId) => {
        SetShowModal(true);
        setSelectedMovie(null);
        try {
            const { data } = await axios.get(`${BASE_URL}/${MovieId}?api_key=${API_KEY}`)
            setSelectedMovie(data);
        } catch (err) {
            console.error(`error fetching ${MovieId}: `, err);
        }
    };

    // close modal
    const handleClose = () => {
        SetShowModal(false);
        setSelectedMovie(null);
    }
    
    return (
        <>
            <div className="cinema-bg">
                <div className="beam beam-left"></div>
                <div className="beam beam-right"></div>
            </div>
            <div className="background">
                <div className="movie-list">
                    {/* get rid of the filtered search stuff -> search globably */}
                    {movies.length === 0 ? (
                    <div className="empty">
                        <h2>Oops! Nothing matched your search.</h2>
                        </div>
                    ) : (
                    movies.map((m) => (
                <MovieCard 
                    key={m.id} 
                    title={m.title}
                    rating={m.vote_average}
                    img={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                    onClick={() => handleMovieClick(m.id)}
            />
                    ))
                    )}
                </div>
                    <Modal 
                    show={showModal}
                    onClose={handleClose}
                    movie={selectedMovie}
                />
                <div>
                    <LoadMore
                    onClick = {handleLoadClick}
                    />
                </div>
            </div>
        </>
    );
};
export default MovieList;