import React from "react";
import TrackList from "../TrackList/TrackList.js";

function SearchResults(props) {

  return (
    <div className="SearchResults">
      <h2>Results</h2>
      {/* Add a TrackList component */}
      <TrackList tracks={props.searchResults} onAdd={props.onAdd} />
    </div>
  );
}

export default SearchResults;