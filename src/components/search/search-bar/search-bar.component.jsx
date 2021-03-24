import './search-bar.scss';
import {useState, useContext} from 'react';
import {SearchContext} from '../search.component';
function SearchBar() {
    const {doSearch, query, setQuery} = useContext(SearchContext);
    function search (){
        doSearch(1);
    }
    function handleKeyDown (e) {
        if (e.key === 'Enter') {
            search();
        }
    }
    return (
        <div className="search-bar">
            <input placeholder='Type Movie Title (to search by year add (year: yyyy))' onKeyDown={handleKeyDown} value={query} onChange={e => setQuery(e.target.value)}  type="text" className="search-bar__input" />
            <div onClick={search} className="search-bar__button"></div>
        </div>
    );
}
export default SearchBar;
