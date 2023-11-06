import React from "react";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Navigation({ onSearch }) { // Inserimento del prop che serve a comunicare il cambiamento della query di ricerca
  const [searchQuery, setSearchQuery] = React.useState(''); // Stato per per memorizzare la query di ricerca inserita dall'utente.

  const handleSearchChange = (event) => { // Funzione che viene chiamata ogni volta che l'utente modifica l'input di ricerca. Questa funzione aggiorna lo stato searchQuery con il testo inserito dall'utente.
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#"><h3> Nice Cream</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
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
