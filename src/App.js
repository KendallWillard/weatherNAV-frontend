import React, { Component } from 'react';
import './App.css';
import Map from './Components/Map/Map';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FormPage from './Components/User/CreateUserForm';
import UserLoginForm from './Components/User/UserLoginForm';
import Navbar from './Components/Navbar/Navbar';
import UpdateUserForm from './Components/User/UpdateUserForm';
import DeleteUser from './Components/User/DeleteUser';

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
      <Navbar />
      <Route exact path="/" render={() => {
        return(
          <FormPage
            setUsername={this.setPhone}
          />
        ) 
      }} />

      <Route exact path='/login' render={() => {
        return(
          <UserLoginForm 
            setUsername={this.setPhone}
          />
        )
      }} />
      <Route exact path='/update' render={() => {
        return(
          <UpdateUserForm phone={this.state.phone}/>
        )
      }} />
      <Route exact path='/delete' render={() => {
        return(
          <DeleteUser phone={this.state.phone}/>
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
