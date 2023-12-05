import React, {useState} from "react"

function SearchBar(props) {
  const [term, setTerm] = useState("");

  const search = () => {
    props.onSearch(term);
  }

  const handleTermChange = (e) => {
    setTerm(e.target.value);
  }

  return (
    <div className="SearchBar">
      <input onChange={handleTermChange} placeholder="Enter A Song, Album, or Artist" />
      <button className="SearchButton" onClick={search}>SEARCH</button>
    </div>
  );
}

export default SearchBar;