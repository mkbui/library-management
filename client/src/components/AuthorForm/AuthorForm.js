import React, { Component } from 'react';
import './AuthorForm.css'
import { Datepicker } from './DatePicker/DatePicker';

class SubmitForm extends Component {
  constructor(props) {
    super(props);
  }
}

export class AuthorForm extends SubmitForm {
  constructor(props) {
    super(props);
    this.state = {
      authors: []
    }
  }

  render() {
    return (
      <div className="container active-pink-3 active-pink-4 mb-4">
        <div className ="form-items">
          <label className ="form-label">Book's Title</label>
          <input type="text" placeholder="Title" />
        </div>
        <div className ="form-items">
          <label className ="form-label">Publisher</label>
          <input type="text" placeholder="Publisher" />
        </div>
        <div className ="form-items">
          <label className ="form-label">Publish Year</label>
          <input type="tel" placeholder="YYYY" />
        </div>
        <div className ="form-items">
          <label className ="form-label">Number of Pages</label>
          <input type="tel" placeholder="#####" />
        </div>
        <div className ="form-items">
          <label className ="form-label">Author's Name</label>
          <input type="text" placeholder="FName MName LName" />
        </div>
        <div className ="form-items">
          <label className ="form-label">Author's ID</label>
          <input type="text" placeholder="##########" />
        </div>
        <div className ="form-items">
          <label className ="form-label">Author's Birthdate</label>
          <Datepicker className="datepicker"></Datepicker>
        </div>
        <div className ="form-items">
          <button className = "form-submit" type="button">Submit</button>
        </div>
      </div>
    )
  }
}