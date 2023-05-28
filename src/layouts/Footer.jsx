import { Container, Row, Col } from 'react-bootstrap';
import '../layouts/css/footer.css';

const FilmFooter = () => {
  return (
    <footer className="footer bg-dark text-light py-5">
      <Container>
        <Row className="justify-content-between">
          <Col xs={12} md={6} lg={3} className="text-right">
            <h5 className="title mb-3">ORIMOVIE</h5>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <h5 className=" title-quick mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/movies" className="text-white">
                  Movies
                </a>
              </li>
              <li>
                <a href="/tv-series" className="text-white">
                  TV Series
                </a>
              </li>
              <li>
                <a href="/watchlist" className="text-white">
                  WatchList
                </a>
              </li>

              <li>
                <a href="/about-us" className="text-white">
                  About Us
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-4 ">
            <p className="text-white">
              © 2023 Film Title. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FilmFooter;
