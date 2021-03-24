import './results.scss';
import Card from '../../card/card.component';
import {useContext} from 'react';
import {SearchContext} from '../search.component';
function Results() {
    const {movies, isEmptyQuery, searchError} = useContext(SearchContext);
    return (
            <div className="results">
                {
                    movies.map((movie) => {
                        console.log(movie)
                        const {imdbID} = movie;
                        return(
                            <Card key={imdbID} movie={movie} />
                        );})
                }
                {
                    isEmptyQuery && <p className='results__msg'>Type Movie Or TV Show.</p>
                }
                {
                    searchError && <p className='results__msg'>{searchError}</p>
                }
            </div>
    );
}

export default Results;
