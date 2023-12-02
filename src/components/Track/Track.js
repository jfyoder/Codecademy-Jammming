import React from "react";
import "./Track.css";

function Track(props) {
  const addTrack = () => {
    props.onAdd(props.track);
  }
  const removeTrack = () => {
    props.onRemove(props.track);
  }

  const renderAction = () => {
    if (isRemoval) {
      return (
        <button className="Track-action" onclick={removeTrack}>-</button>
      )
    } 
    return (
      <button className="Track-action" onClick={addTrack}>+</button>
    )
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        <p>{props.track.artist} | {props.track.album}</p>
      </div>
      {renderAction()}
    </div>
  ) 
}

export default Track;