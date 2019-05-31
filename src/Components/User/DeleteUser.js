import React from 'react'

export default class DeleteUser extends React.Component { 

  componentDidMount() {
    console.log('fired')
    let currUser = ( Number( window.localStorage.getItem(this.props.phone) ) + 1)
    fetch(`http://localhost:3001/users/${currUser}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    localStorage.removeItem(this.props.phone)
  }

  render() {
    return(
      <div>
      <h1>You've successfully Deleted your account. Unbelievable. Get off my site.</h1>
      </div>
    )
  }
}