import { Card, Button } from 'react-bootstrap';
import './AnimeCards.css'

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

function AnimeCards({ imageUrl, title, description }) {
  const maxLength = 200;

  const truncatedDescription = truncateText(description, maxLength);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {truncatedDescription}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default AnimeCards;
