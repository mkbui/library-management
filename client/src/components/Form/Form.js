import React, { Component } from 'react';
import './Form.css'
import { Datepicker } from './DatePicker/DatePicker';
import axios from 'axios';
function checkEmpty(strings){
  return strings.replace(/\s/g,"") === ""
}

class SubmitForm extends Component {
  constructor(props) {
    super(props);
  }
}

export class BookForm extends SubmitForm {
  constructor(props) {
    super(props);
    this.state = {
      authors: this.props.authors,
      isbn: "",
      title: "",
      publisher: "",
      numpages: "",
      year: "", 
      authorlist: "",
    }
    console.log("Book form authors: ", this.props.authors)
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  
  submits = (event) => {  
    const isbn = this.state.isbn 
    const title = this.state.title 
    const publisher = this.state.publisher
    const numpages = parseInt(this.state.numpages)
    const year = parseInt(this.state.year)
    const authorlist = this.state.authorlist.replace(/\s/g,'').split(',').filter(a => a != '')
    const authorid = this.state.authors.map(a => a.AId)

    // Static check
    if ( checkEmpty(isbn) || checkEmpty(title) || checkEmpty(publisher)){
      alert('Please fill in all the required fields!')
    }
    
    else { if (!Number.isInteger(year) || isNaN(year)) {
      alert('Invalid year!')
    }    
    else { if (!Number.isInteger(numpages) || isNaN(numpages)) {
      alert('Invalid number of pages!')
    }
    else { if ((authorlist.length > 0) && (!authorlist.every(a => authorid.includes(a)))){
      console.log("Author list: ", authorid, "AuthorID: ", authorlist)
      alert('Author ID specified does not exist in the database!')
    }
    
    else { const newItem = {
      isbn: isbn,
      title: title,
      publisher: publisher,
      year: year,
      numpages: numpages,
      authorlist: authorlist
    }
    console.log("Submit item: ", newItem)

    axios.post('/api/insert/books', newItem)
    .then(res => {
      console.log(res)
      alert('New book added successfully!')
    })
    .catch(error => {
      alert('Error: integrity constraint violation!');
      console.log(error);
    })

    }}}}
    //this.props.handleSubmit(x);
  }

  render() {
    return (
      <div className="container active-pink-3 active-pink-4 mb-4">
        <div className ="form-items">
          <label className ="form-label">ISBN-13 Code *</label>
          <input type="text" placeholder="ISBN" name="isbn" onChange = {this.handleInputChange}/>
        </div>
        <div className ="form-items">
          <label className ="form-label">Book's Title *</label>
          <input type="text" placeholder="Title" name="title" onChange = {this.handleInputChange}/>
        </div>
        <div className ="form-items">
          <label className ="form-label">Publisher *</label>
          <input type="text" placeholder="Publisher" name="publisher" onChange = {this.handleInputChange}/>
        </div>
        <div className ="form-items">
          <label className ="form-label">Published Year *</label>
          <input type="tel" placeholder="YYYY" name="year" onChange = {this.handleInputChange}/>
        </div>
        <div className ="form-items">
          <label className ="form-label">Number of Pages *</label>
          <input type="tel" placeholder="#####" name="numpages" onChange = {this.handleInputChange} />
        </div>
        <div className ="form-items">
          <label className ="form-label">Authors' ID (separated by commas)</label>
          <input type="text" placeholder="##########" name="authorlist" onChange = {this.handleInputChange}/>
        </div>
        <div className ="form-items">
          <button className = "form-submit" type="button" onClick = {this.submits}>Submit</button>
        </div>
      </div>
    )
  }
}