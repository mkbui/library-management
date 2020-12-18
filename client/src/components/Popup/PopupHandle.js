import React, { useState } from 'react';
import Popup from './Popup.js';
import './Popup.css'
import {AuthorForm} from '../AuthorForm/AuthorForm'
 
function PopupHandle() {
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
        <AuthorForm></AuthorForm>
      </>}
      handleClose={togglePopup}
    />}
  </div>
}
 
export default PopupHandle;