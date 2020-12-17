import React, { Component } from 'react';
import axios from 'axios';
import {AuthorForm} from './components/Form';
import Taskbar from './components/taskbar/Taskbar';
import {BookTable} from './components/Table';
import FooterPage from './components./'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      login: false,
      books: [],
      admins: [],
      authors: [],
    }
  };

  componentDidMount() {
    
    axios.get('/api/books')
         .then(res => {
            const data = res.data;
            this.setState({ books: data.books});
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
        authors = [newAuthor,...authors];
        this.setState({ ...this.state, authors: authors });
      })
      .catch(error => console.log(error));
  };


  render() {
    return(
      <div>
        <Taskbar/>
        <h2>Add a new author</h2>
        <AuthorForm handleInputChange = {this.handleInputChange} handleInsertSubmit = {this.handleInsertAuthor}></AuthorForm>
        <hr />
        
        <h1>Books</h1>
        <BookTable data = {this.state.books}/>
        
        
        <h1>Site Admins:</h1>
        <ul>
          {this.state.admins.map(item => (
            <li key={item.UId}>
              <h2>{item.UName}</h2>
              <div>{item.UAddress}</div>
            </li>
          ))}
        </ul>
      </div>
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