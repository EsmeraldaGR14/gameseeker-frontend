import React, {useState} from 'react';


const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
         window.location.href = "/search?q=" + searchInput;
    };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
 
};


export default SearchBar