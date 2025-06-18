import { useState } from 'react'
import './App.css'
import Header from './data/Components/Header/Header'
import MovieList from './data/Components/MovieList/MovieList'
import LoadMore from './data/Components/LoadMore/LoadMore'
import Footer from './data/Components/Footer/Footer'

const App = () => {
const [searchTerm, setSearchTerm] = useState('');
const [sortParam, setSortParam] = useState(''); // for sorting
const [submitTerm, setSubmitTerm] = useState(''); // for searching 
const handleSubmitClick = ({ searchTerm }) => {
  setSubmitTerm(searchTerm); 
};
 const handleKeyDown = (e) => {
  console.log(e.key);
  if (e.key === 'Enter') {
    setSubmitTerm(searchTerm);
  }
};
  return (
    
    <div className="App">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        sortParam={sortParam} setSortParam={setSortParam}
        setSubmitTerm={setSubmitTerm} handleSubmitClick={handleSubmitClick}
        handleKeyDown={handleKeyDown}
        
      />
      <MovieList 
       searchTerm={searchTerm}
       sortParam={sortParam}
       setSortParam={setSortParam}
       submitTerm={submitTerm}
      />
      <Footer />
    </div>
  
  );
}
export default App;
