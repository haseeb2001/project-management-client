import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice';

function Header() {
  const dispatch = useDispatch();
  return (
    <Navbar collapseOnSelect expand='lg' variant='dark' className='pb-2'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          Project Mngmnt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link
              className='margin-right-20'
              onClick={() => dispatch(logout())}
              to='/auth'
            >
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
