import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => {
        this.setState({ smurfs: response.data });
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' render={props => <SmurfForm
          {...props}
          name={this.state.name}
          age={this.state.age}
          height={this.state.height}
          newSmurf={this.addSmurf} />} />
        <Route path='/' render={props => <Smurfs
          {...props}
          smurfs={this.state.smurfs} />} />
      </div>
    );
  }
}

export default App;
