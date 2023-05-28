import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './css/header.css';

const Header = () => {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="fixed-top">
      <Navbar.Brand as={Link} to="/" className="navbar-title">
        ORIMOVIE
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto mb-2 mb-lg-0">
          <Nav.Link as={Link} to="/" className="navbar-link">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/movies" className="navbar-link">
            Movies
          </Nav.Link>
          <Nav.Link as={Link} to="/tv-series" className="navbar-link">
            TV Series
          </Nav.Link>
          <Nav.Link as={Link} to="/watchlist" className="navbar-link">
            Watchlist
          </Nav.Link>
          <Nav.Link as={Link} to="/about-us" className="navbar-link">
            About Us
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
