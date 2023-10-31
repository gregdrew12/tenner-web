import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

function SearchBar() {
    const navigate = useNavigate();
    const [searchFor, setSearchFor] = useState();

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search?query=${searchFor}`);
    };

    return (
        <form onSubmit={handleSearch}>
            <div className="search-bar-container">
                <input
                type="text"
                placeholder="Search..."
                value={searchFor}
                onChange={(e) => setSearchFor(e.target.value)}
                className="search-input"
                />
                <button type="submit">Search</button>
            </div>
        </form>
    );
}

export default SearchBar;