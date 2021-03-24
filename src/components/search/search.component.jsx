import './search.scss';
import SearchBar from "./search-bar/search-bar.component";
import Results from "./results/results.component";
import {createContext, useState} from 'react';
import * as searchService from '../../services/search-service';
export const SearchContext = createContext({});

function Search() {
    const [movies, setMovies] = useState([]);
    const [pages, setPages] = useState(null);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [isMore, setIsMore] = useState(false);
    const [isEmptyQuery, setIsEmptyQuery] = useState(true);
    const [searchError, setSearchError] = useState(false);
    const calcPages = (totalResults) => {
        return Math.ceil(totalResults / 10);
    }
    const doSearch = async (page, isNewSearch) => {
        if (!isNewSearch && pages !== null && pages <= page) {
            setIsMore(false);
            return;
        }
        setSearchError(false);
        setIsEmptyQuery(false);
        if (query === '') {
            setIsEmptyQuery(true);
            setMovies([]);
            return;
        }
        const res = await searchService.searchMovieByName(query, page);
        if (Math.floor(res.status / 100) !== 2) {
            setMovies([]);
            throw new Error();
        }
        const {data} = res;
        if (data.Search) {
            setCurrentPage(page);
            if (page === 1) {
                if (data.totalResults) {
                    setPages(calcPages(data.totalResults));
                }
                setMovies(data.Search);
            } else {
                setMovies([...movies, ...data.Search]);
            }
            if (calcPages(data.totalResults) > page) {
                setIsMore(true);
            }
        }
        if (data.Error) {
            setMovies([]);
            setSearchError(data.Error)
        }
    }
    return (
        <>
            <SearchContext.Provider value={{doSearch, movies, searchError, isEmptyQuery, isMore, currentPage, query, setQuery}}>
                <header className="header">
                    <SearchBar />
                </header>
                <Results />
            </SearchContext.Provider>

        </>

    );
}

export default Search;
