import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom'
import displayLoginError from './DisplayLoginError';
import DisplayLoginError from "./DisplayLoginError";

export default class UserLoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loginStatus: false,
      username: '',
      displayLoginError: false
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  onLogin = (event) => {
    event.preventDefault();
    if(window.localStorage.getItem(this.state.username) ) {
      this.props.setUsername(window.localStorage.getItem(this.state.username));
      this.redirectToMap();
    }
    else {
      this.clearState()
    }
  }

  redirectToMap = () => {
    this.setState({loginStatus: true})
  }

  setLoginError = () => {
    this.setState({displayLoginError: true})
  }

  clearState = () => {
    this.setState({
      loginStatus: false,
      username: '',
      displayLoginError: true
    })
  }

  render() {
    if(this.state.loginStatus) {
      return (<Redirect to='/map' />)
    }
  return (
    <MDBContainer 
    onSubmit={this.onLogin}
    style={{
      height: '100vh', /* Magic here */
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
     }}>>
      <MDBRow>
        <MDBCol md="12">
          <form>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
              <MDBInput
                label="Type your username"
                icon="user-ninja"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div className="text-center">
              <MDBBtn onClick={this.onLogin}>Login</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};
}
