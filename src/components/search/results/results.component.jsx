import './results.scss';
import Card from '../../card/card.component';
import {useContext} from 'react';
import {SearchContext} from '../search.component';
function Results() {
    const {movies, isMore, currentPage, doSearch, isEmptyQuery, searchError} = useContext(SearchContext);
    function searchMore (){
        doSearch(currentPage + 1);
    }
    const renderCards = () => {
        return movies && movies.map((movie, index) => {
            const {imdbID} = movie;
            return(
                <Card key={imdbID+index} movie={movie} />
            );})
    };
    return (
            <div className="results">
                {
                    renderCards()
                }
                {
                    !!movies.length && isMore && <div className="results__show-more-container"><div onClick={searchMore} className="results__show-more-btn">show more</div></div>
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
