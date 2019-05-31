import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import { Redirect } from 'react-router-dom';

export default class UpdateUserForm extends React.Component {
    constructor(props) {
        super(props)
        //first_name and last_name must be undercase to pass backend validation
        this.state = {
            first_name: '',
            last_name: '',
            phone: props.phone,
            username: '',
            loginStatus: false
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    clearState = () => {
        this.setState({
            first_name: '',
            last_name: '',
            phone: '',
            username: '',
            loginStatus: true
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
            username: this.state.username
        }
        
        let userId = ( Number( window.localStorage.getItem(this.state.phone) ) + 1)
        fetch(`http://localhost:3001/users/${userId}`, {
            method: 'PATCH',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({user})
          })
          .then(this.clearState())
          .catch(error => console.error(error))
    }
    

    render() {
    if(this.state.loginStatus) {
        return <Redirect to='/map' />
    }
    return (
        <MDBContainer 
        onSubmit={this.handleSubmit}
        style={{
            height: '100vh', /* Magic here */
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
           }}>
        <MDBRow>
            <MDBCol md="12">
            <form>
                <p className="h5 text-center mb-4">Update Profile</p>
                <div className="blue-text">
                <MDBInput
                    label="First Name"
                    icon="user-ninja"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.handleChange}
                    name="first_name"
                    value={this.state.first_name}
                />
                <MDBInput
                    label="Last Name"
                    icon="user-ninja"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.handleChange}
                    name="last_name"
                    value={this.state.last_name}
                />
                <MDBInput
                    label="Phone"
                    icon="mobile"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.handleChange}
                    name="phone"
                    value={this.state.phone}
                />
                <MDBInput
                    label="Username"
                    icon="user-lock"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={this.handleChange}
                    name="username"
                    value={this.state.username}
                />
                </div>
                <div className="text-center">
                <MDBBtn onClick={this.handleSubmit} color="primary">Update User</MDBBtn>
                </div>
            </form>
            </MDBCol>
        </MDBRow>
        </MDBContainer>
    );
    };
    }
