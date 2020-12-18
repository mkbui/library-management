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
        <div class="form-items">
          <label class="form-label">Author's Name</label>
          <input type="text" placeholder="FName MName LName" />
        </div>
        <div class="form-items">
          <label class="form-label">Author's ID</label>
          <input type="text" placeholder="##########" />
        </div>
        <div class="form-items">
          <label class="form-label">Author's Birthdate</label>
          <Datepicker className="datepicker"></Datepicker>
        </div>
        <div class="form-items">
          <button class = "form-submit" type="button" onclick="alert('Hello world!')">Submit</button>
        </div>
      </div>
    )
  }
}