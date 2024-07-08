import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AnimeCards.css';

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

function AnimeCards({ id, imageUrl, title, description }) { // Add id prop
  const navigate = useNavigate(); // Initialize useNavigate
  const maxLength = 200;

  const truncatedDescription = truncateText(description, maxLength);

  const handleCardClick = () => {
    navigate(`/anime/${id}`); // Navigate to the AnimeInfo page with the anime id
  };

  return (
    <Card style={{ width: '18rem', cursor: 'pointer' }} onClick={handleCardClick}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {truncatedDescription}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AnimeCards;
