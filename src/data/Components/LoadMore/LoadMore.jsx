import React from 'react'
import './LoadMore.css'

const LoadMore = ({ onClick }) => {
    return (
        <>
        <div className="section">
             <button className="button" onClick={onClick}>Load More</button>
        </div>
       
        </>
    )
}
export default LoadMore;