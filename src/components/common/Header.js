import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Header.css';

function Header() {

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      variant='dark'
      className='margin-bottom-50'
    >
      <Container>
        <Navbar.Brand>
          <FontAwesomeIcon className='margin-right-5' />
          Project Mngmnt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link className='margin-right-20'>
              Nav-01
            </Nav.Link>
            <Nav.Link className='margin-right-20' >
            Nav-02
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
