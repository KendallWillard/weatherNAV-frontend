import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import './Navbar.css'

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <MDBNavbar id="navbar" color="default-color" dark expand="md">
      <MDBNavbarBrand>
        <strong className="white-text">weatherNAV</strong>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={this.toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink to="/">Sign Up</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/login">Login</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/map">Map</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/update">Update User</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="/delete">Delete User</MDBNavLink>
          </MDBNavItem>

        </MDBNavbarNav>
        <MDBNavbarNav right>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    );
  }
}

export default NavbarPage;