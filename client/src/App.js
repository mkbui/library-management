import React, { Component, useState } from 'react';
import axios from 'axios';
import { BookTable } from './components/BookTable/Table';
import { BookForm } from './components/Form/Form';
import Taskbar from './components/Taskbar/Taskbar';
import FooterPage from './components/Footer/Footer';
import PopupHandle from './components/Popup/PopupHandle'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.num = 0;
    this.state = {
      books: [],
      admins: [],
      authors: [],
    }
  };

  componentDidMount() {
    axios.get('/api/books')
      .then(res => {
        const data = res.data;
        this.setState({ books: data.books });
      })
      .catch(error => console.log(error));

    axios.get('/api/admins')
      .then(res => {
        const data = res.data;
        this.setState({ admins: data.admins });
      })
      .catch(error => console.log(error));

    axios.get('/api/authors')
      .then(res => {
        const data = res.data;
        this.setState({ authors: data.authors });
      })
      .catch(error => console.log(error));
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleBookAuthorChange = (value) => {
    this.setState({
      "baid": value
    });
    console.log(value)
  }

  handleInsertAuthor = (event) => {
    event.preventDefault();

    const newAuthor = {
      aid: this.state.aid,
      aname: this.state.aname,
      abirth: this.state.abirth
    };

    axios.post('/api/insert/authors', newAuthor)
      .then(res => {
        let authors = this.state.authors;
        authors = [newAuthor, ...authors];
        this.setState({ authors: authors });
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <Taskbar />

        <div className="author-form">
          <PopupHandle authors = {this.state.authors} handleSubmit = {(x) => alert('Submitted ', x)}></PopupHandle>
        </div>


        <div className="title"><h1>Book List</h1></div>
        <BookTable data={this.state.books} />

        <FooterPage />
      </div >
    )
  }
};

export default App;


/*
<BookForm handleInputChange = {this.handleInputChange} handleBookAuthorChange = {this.handleBookAuthorChange} handleInsertSubmit = {this.handleInsertBook} authorlist = {this.state.authors}></BookForm>

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    message: ''
  }

  componentDidMount() {
    axios.get('/api/test')
         .then(result => this.setState({ message: result.data.message }))
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <h1>{ this.state.message }</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    )
  }
}

export default App;
*/