
import React from "react";
import './BookInfo.css'
 
const Popup = props => {
  return (
    <div className="book-popup-box">
      <div className="book-box">
        <span className="book-close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;