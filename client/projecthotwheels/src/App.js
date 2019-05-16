import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Reports} from './components/Reports'

class App extends Component {

  constructor() {
    super()

    this.state = {
      plate: '',
      state : '',
      searchResults: null
    }
  }

//creatign the search function for my button
  searchPlate = () => {

    fetch ('http://localhost:8000/api/search',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plate: this.state.plate,
        state: this.state.state
      })
    })
    .then(res => res.json())
    .then(json => this.setState({
      searchResults: json
    }))
  }

  handleTextchange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })

  }

  render() {
    console.log(this.state.searchResults)
    let message = (<h3>This vehicle has not been reported as stolen.</h3>)
    if(this.state.searchResults && this.state.searchResults.length > 0){
      let email = "mailto:" + this.state.searchResults[0].email
      message = (
        <div>
          <h3>This vehicle has been reported as stolen.</h3>
          <a href = {email} target = "_top">Send them an email</a>
        </div>)
    }
    return(
      <div>
      <h1>Home Page</h1>
      <h3>Search if a vehicle has been reported</h3>
      <input onChange={this.handleTextchange} placeholder ="Enter License Plate"type ="text" name="plate"/>
      <input onChange={this.handleTextchange} placeholder ="Enter State"type="text" name="state"/>
      <button onClick={this.searchPlate}>Search</button>
      {this.state.searchResults ? message : null}
      </div>
    )
  }
}
export default App;
