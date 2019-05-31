import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';
import '../stylesMenu/styleM.css'
export class Menu extends Component {

  render() {
    return (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">
      <img
        className="d-inline-block align-top"
        width='85'
        height='50'
        src={require("./images/IMG_1600.png")}
        alt="hornHub"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
      <NavLink to='/' className="menColor">Home</NavLink>
      <NavLink to='/reports' className="menColor">Reports</NavLink>
      </Nav>
  </Navbar.Collapse>
</Navbar>

//
// <Navbar collapseOnSelect bg="dark" expand="lg" variant='dark'>
//   <Container>
//   <Navbar.Brand></Navbar.Brand>
//   </Container>
//   <Navbar.Toggle className='justify-content-end' aria-controls="basic-navbar-nav" />
//   <Navbar.Collapse id="basic-navbar-nav">
//     <Nav className="mr-auto">
//
//       </Nav>
//   </Navbar.Collapse>
// </Navbar>


    )
  }
}

export class BaseLayout extends Component {
  render() {
    return (
      <div>
      <Menu />
      {this.props.children}
      </div>
    )
  }

}
