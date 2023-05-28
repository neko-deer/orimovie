import { Card, Container, Row, Col } from 'react-bootstrap';
// import BackgroundImg from '../../assets/batik.jpeg';
import Profile1 from '../../assets/shabrina.jpeg';
import Profile2 from '../../assets/rizz.jpg';
import Profile3 from '../../assets/angel.jpeg';
import Profile4 from '../../assets/ar.jpg';

import './aboutUs.css';

const cardData = [
  {
    id: 1,
    image: Profile1,
    name: 'Shabrina Firmansyah',
    description: 'Mahasiswa',
  },
  {
    id: 2,
    image: Profile2,
    name: 'Teuku Fazariz ',
    description: 'Mahasiswa',
  },
  {
    id: 3,
    image: Profile3,
    name: 'Giselle Angelina',
    description: 'Mahasiswa',
  },
  {
    id: 4,
    image: Profile4,
    name: 'Arya Reswara',
    description: 'Mahasiswa',
  },
];

const CardProfile = () => {
  return (
    <div className="about-us w-100">
      <div className="title">
        <span>About Us</span>
      </div>
      <Container>
        <div className="card-list">
          <Row>
            {cardData.map((card) => (
              <Col key={card.id} lg={6} md={6} sm={12} xs={12}>
                <Card className="text-center rounded">
                  <div className="card-image p-3">
                    <Card.Img src={card.image} className="rounded-circle" />
                  </div>
                  <Card.Body>
                    <Card.Title style={{ color: '#d5d5d5' }}>
                      {card.name}
                    </Card.Title>
                    <Card.Text style={{ color: '#c0c0c0' }}>
                      {card.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default CardProfile;
