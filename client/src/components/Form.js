import React, { Component } from 'react';

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

  render(){
    return(
        <form onSubmit={this.props.handleInsertSubmit}>
          <table>
            <tbody>
              <tr>
                <th><label>Author's Name</label></th>
                <td>
                  <input
                    name="aname"
                    type="text"
                    onChange={this.props.handleInputChange} />
                </td>
              </tr>

              <tr>
                <th><label>Author ID</label></th>
                <td>
                  <textarea
                    name="aid"
                    onChange={this.props.handleInputChange} />
                </td>
              </tr>

              <tr>
                <th><label>Author Birthdate (yyyy-mm-dd)</label></th>
                <td>
                  <textarea
                    name="abirth"
                    onChange={this.props.handleInputChange} />
                </td>
              </tr>
            </tbody>
          </table>

          <button type="submit">Submit</button>
        </form>
    )
  }
}

/*
export class BookForm extends SubmitForm {

  constructor(props) {
    super(props);
    this.state = {
      authorlist: props.authorlist
    }
  }

  handleAuthorChange = (value) => {
    this.setState({
      chosenauthor: value
    }).bind(this);

    this.props.handleBookAuthorChange(value);
  }

  render(){
    return(
        <form onSubmit={this.props.handleInsertSubmit}>
          <table>
            <tbody>
              <tr>
                <th><label>Book Title</label></th>
                <td>
                  <input
                    name="Title"
                    type="text"
                    onChange={this.props.handleInputChange} />
                </td>
              </tr>

              <tr>
                <th><label>Publisher</label></th>
                <td>
                  <textarea
                    name="Publisher"
                    onChange={this.props.handleInputChange} />
                </td>
              </tr>

              <tr>
                <th><label>Year published</label></th>
                <td>
                  <textarea
                    name="Year"
                    onChange={this.props.handleInputChange} />
                </td>
              </tr>

              <tr>
                <th><label>Number of pages</label></th>
                <td>
                  <textarea
                    name="NumPage"
                    onChange={this.props.handleInputChange} />
                </td>
              </tr>

              <tr>
                <th><label>Year published</label></th>
                <td>
                  <textarea
                    name="Year"
                    onChange={this.props.handleInputChange} />
                </td>
              </tr>

              <select
                value = {this.state.chosenauthor}
                onChange = {this.handleAuthorChange}
              >
                {this.state.authorlist.map(item => (
                  <option value = {item.AId}>{item.AName}</option>
                ))}
              </select>             

            </tbody>
          </table>

          <button type="submit">Submit</button>
        </form>
    )
  }
}

*/