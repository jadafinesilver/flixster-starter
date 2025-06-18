import React, { useState, useEffect} from 'react';
import MovieList from '../MovieList/MovieList';
import './Header.css'


function Header ({searchTerm, setSearchTerm, sortParam, setSortParam, setSubmitTerm, handleSubmitClick, handleKeyDown}) {
    //console.log('img value:', img);
    const onClear = () => {
        setSearchTerm('');
        setSubmitTerm('');
    };

    const handleSort = (e) =>{
        console.log(e.target.value)
        setSortParam(e.target.value)
    };

    return (
        <>
        <div className="back">
        <div className="header">
            <div className="name">
                <h1 className='text-border'>Flixster 🎬 </h1>
                <div className="search-and-sort">
                    <div className="search">
                        <input className="bar"
                        placeholder='Search'
                        type="text"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        />


                        <button className="sub"
                        onClick={() => handleSubmitClick({ searchTerm })}

                        >Submit</button>


                        <button className="sub"
                        onClick={onClear}
                        >Clear</button>
                    </div>
                    <div className="sort">
                            <select className="sub"
                                value={sortParam}
                                onChange={handleSort}
                            >
                                <option value="" disabled>sort by</option>
                                <option value="original_title.asc">Title (A-Z)</option>
                                <option value="primary_release_date.desc">Release Date (Newest - Oldest)</option>
                                <option value="vote_average.desc">Vote Average (Descending)</option>
                                <option value="default">Now Playing</option>
                            </select>
                        
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    );
}
export default Header;