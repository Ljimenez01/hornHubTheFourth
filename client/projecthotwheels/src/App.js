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
      searchResults: null,
      validInput: true,
      latitude: null,
      longitude: null
    }
  }

componentDidMount() {
  if("geolocation" in navigator){
  let self = this
    navigator.geolocation.getCurrentPosition(function(position){
      console.log(position)
      self.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      })
    })
  }
}

//creatign the search function for my button
  searchPlate = () => {
    // this.setState({
    //   validInput: true
    // })
    if(/^[a-z0-9]+$/i.test(this.state.plate)){
      fetch ('http://localhost:8000/api/updateReport',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plate: this.state.plate,
          state: this.state.state,
          latitude:this.state.latitude,
          longitude:this.state.longitude
        })
      })
      .then(res => res.json())
      .then(json => {
        console.log('json', json)
        this.setState({
          searchResults: json,
          validInput: true,
          email: json.email
        })
      })
    }
    else {
      this.setState({
        validInput: false,
        email: null
      })
    }

  }

  handleTextchange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })

  }

  render() {
    console.log(this.state.searchResults)
    console.log(this.state)

    if((this.state.searchResults || this.state.searchResults === 0) && this.state.validInput) {
      let email = "mailto:" + this.state.email
      let message = (<h3>This vehicle has not been reported as stolen.</h3>)
      if(this.state.searchResults !== 0){
        message = (
        <div>
          <h3>This vehicle has been reported as stolen.</h3>
          <a href = {email} target = "_top">Send them an email</a>
          <span>Vehicle coordinates: <span>latitude: {this.state.latitude}</span>
          <span>longitude: {this.state.longitude}</span></span>
        </div>
        )
      }
      return (
          <div>
            <h3>Sign In </h3>

            <h3>Search if a vehicle has been reported</h3>
            <input onChange={this.handleTextchange} placeholder ="Enter License Plate"type ="text" name="plate"/>
            <input onChange={this.handleTextchange} placeholder ="Enter State"type="text" name="state"/>
            <button onClick={this.searchPlate}>Search</button>
            {message}
          </div>
      )
    }
    else {
      return(
        <div>
          <h3>Sign In </h3>

          <h3>Search if a vehicle has been reported</h3>
          <input onChange={this.handleTextchange} placeholder ="Enter License Plate"type ="text" name="plate"/>
          <input onChange={this.handleTextchange} placeholder ="Enter State"type="text" name="state"/>
          <button onClick={this.searchPlate}>Search</button>
          {!this.state.validInput ? <p>License plate must be alphanumeric</p> : null}
        </div>

      )
    }




    // let message = (<h3>This vehicle has not been reported as stolen.</h3>)
    // if(this.state.searchResults && this.state.searchResults.length > 0){
    //   let email = "mailto:" + this.state.searchResults[0].email
    //   message = (
    //     <div>
    //       <h3>This vehicle has been reported as stolen.</h3>
    //       <a href = {email} target = "_top">Send them an email</a>
    //       <span>Vehicle coordinates: <span>latitude: {this.state.latitude}</span><span>longitude: {this.state.longitude}</span></span>
        // </div>)
    // }
    // return(
    //   <div>
    //
    //
    //   </div>
    // )
  }
}
export default App;
