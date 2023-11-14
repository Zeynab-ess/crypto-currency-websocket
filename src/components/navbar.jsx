import React, { memo } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const MainNavbar = memo(() => {
  return (
    <Navbar expand="sm">
      <Container
        fluid
        className="d-flex flex-row-reverse justify-content-end px-0 flex-md-row"
      >
        <Navbar.Brand href="#home" className="ms-2">
          Favorites
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-color-light px-2"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#all" active>
              All
            </Nav.Link>
            <Nav.Link href="#spot">Spot</Nav.Link>
            <Nav.Link href="#futures">Futures</Nav.Link>
            <Nav.Link href="#newListings">NewListings</Nav.Link>
            <Nav.Link href="#ranking">Ranking</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default MainNavbar;
