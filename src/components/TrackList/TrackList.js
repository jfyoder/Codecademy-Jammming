import React from "react";
import Track from "../Track/Track.js";
import "./TrackList.css";

function TrackList(props) {

  return (
    <div className="TrackList">
      {props.tracks.map( (song) => <Track
        key={song.id}
        track={song}
        onAdd={props.onAdd}
        onRemove={props.onRemove}
        isRemoval={props.isRemoval}
      /> )}
    </div>
  )
}

export default TrackList;