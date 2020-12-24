import React, { useState } from 'react';
import Popup from './BookInfo.js';
import './BookInfo.css'

function PopupHandle(book, bookInfo) {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    function Info() {
        console.log(book)
        return (
            <div className="bookInfo-container">
                <ul>
                    <li>Title: {book.data.Title}</li>
                    <li>Authors: {book.data.Authors}</li>
                    <li>Number of Pages: {book.data.NumPage}</li>
                    <li>Publisher: {book.data.Publisher}</li>
                    <li>Year: {book.data.Year}</li>
                    {/* <li>{bookInfo}</li> */}
                </ul>
            </div>
        )
    }

    return <div>
        <input
            className="book-add-button"
            type="button"
            value="View"
            onClick={togglePopup}
        />
        {isOpen && <Popup
            content={<>
                {Info()}
            </>}
            handleClose={togglePopup}
        />}
    </div>
}

export default PopupHandle;