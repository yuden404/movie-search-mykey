import './search.scss';
import SearchBar from "./search-bar/search-bar.component";
import Results from "./results/results.component";
import {createContext, useState} from 'react';
import * as searchService from '../../services/search-service';
export const SearchContext = createContext({});

function Search() {
    const [movies, setMovies] = useState([]);
    const [isEmptyQuery, setIsEmptyQuery] = useState(true);
    const [searchError, setSearchError] = useState(false);
    const doSearch = async (movieName) => {
        setSearchError(false);
        setIsEmptyQuery(false);
        setMovies([]);
        if (movieName === '') {
            setIsEmptyQuery(true);
            return;
        }
        const res = await searchService.searchMovieByName(movieName);
        if (Math.floor(res.status / 100) !== 2) {
            throw new Error();
        }
        const {data} = res;
        if (data.Search) {
            setMovies(data.Search);
        }
        if (data.Error) {
            setSearchError(data.Error)
        }
    }
    return (
        <>
            <SearchContext.Provider value={{doSearch, movies, searchError, isEmptyQuery}}>
                <header className="header">
                    <SearchBar />
                </header>
                <Results />
            </SearchContext.Provider>

        </>

    );
}

export default Search;
