import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navigation({ onSearch }) {
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => {
    setExpanded(!expanded);
  };

  const [searchQuery, setSearchQuery] = useState('');  // Nuovo stato per la query di ricerca

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="navbar-expand">
  <Container fluid>
    <Navbar.Brand href="#"><h3> Nice Cream</h3></Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" onClick={toggleMenu} />
    <Navbar.Collapse id="navbarScroll" className={expanded ? 'show' : ''}>
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Link to={'/'} className='nav-link'>Home</Link>
        <Nav.Link href="#action2">Prodotti</Nav.Link>
      </Nav>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Cerca"
          className="me-2"
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button variant="outline-success" className='btn-warning'>Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}

export default Navigation;
