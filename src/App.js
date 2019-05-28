import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map'

class App extends Component {
  render() {
    return (
      <div className="App">
    <Map
     google={this.props.google}
     center={{lat: 18.5204, lng: 73.8567}}
     height='300px'
     zoom={15}
    />
      </div>
    );
  }
}

export default App;
