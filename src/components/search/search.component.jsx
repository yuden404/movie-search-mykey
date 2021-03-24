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
    const [hasMore, setHasMore] = useState(false);
    const [isEmptyQuery, setIsEmptyQuery] = useState(true);
    const [searchError, setSearchError] = useState(false);
    const calcPages = (totalResults) => {
        return Math.ceil(totalResults / 10);
    }
    const initSearchState = () => {
        setSearchError(false);
        setIsEmptyQuery(false);
    }
    const emptySearch = () => {
        setIsEmptyQuery(true);
        setMovies([]);
    }
    const doSearch = async (page, isNewSearch) => {
        if (!isNewSearch && pages !== null && pages <= page) {
            setHasMore(false);
            return;
        }
        initSearchState();
        if (query === '') {
            emptySearch();
            return;
        }
        const res = await searchService.searchMovieByName(query, page);
        if (Math.floor(res.status / 100) !== 2) {
            setMovies([]);
            setHasMore(false);
            throw new Error();
        }
        const {data} = res;
        if (data.Error) {
            setMovies([]);
            setSearchError(data.Error);
            return;
        }

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
            setHasMore(true);
            return;
        }
        setHasMore(false);
    }
    return (
        <>
            <SearchContext.Provider value={{doSearch, movies, searchError, isEmptyQuery, isMore: hasMore, currentPage, query, setQuery}}>
                <header className="header">
                    <SearchBar />
                </header>
                <Results />
            </SearchContext.Provider>

        </>

    );
}

export default Search;
