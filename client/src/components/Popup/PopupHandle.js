import React, { useState } from 'react';
import Popup from './Popup.js';
import './Popup.css'
import {BookForm} from '../Form/Form'
 
function PopupHandle(props) {
  const [isOpen, setIsOpen] = useState(false);
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
 
  return <div>
    <input
      className = "add-button"
      type="button"
      value="Add Book"
      onClick={togglePopup}
    />
    {isOpen && <Popup
      content={<>
        <BookForm authors = {props.authors} handleSubmit = {props.handleSubmit}></BookForm>
      </>}
      handleClose={togglePopup}
    />}
  </div>
}
 
export default PopupHandle;