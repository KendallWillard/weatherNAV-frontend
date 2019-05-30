import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Components/Map/Map';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FormPage from './Components/User/CreateUserForm';

class App extends Component {
  state = {
    phone: ''
  }

  setPhone = (phone) => {
    this.setState({phone})
  }
  render() {
    return (
    <Router>
      <Route exact path="/" render={() => {
        return(
          <FormPage
            setUsername={this.setPhone}
          />
        ) 
      }} />
      <Route exact path='/map' render={() => {
        return( 
          <Map 
            google={this.props.google}
            center={{lat: 39.7392, lng: -104.9903}}
            height='300px'
            zoom={15}
            phone={this.state.phone}
          />
        )
      }}/>   
      </Router>
    );
  }
}

export default App;
