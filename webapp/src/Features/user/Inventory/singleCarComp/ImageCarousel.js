// ImageCarousel.js
import React from 'react';
import Carousel from 'react-bootstrap/Carousel'; // Make sure you have react-bootstrap installed

const ImageCarousel = ({ carImages }) => {
  return (
    <Carousel>
      {carImages.map((image, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={image} alt={`Car image ${index + 1}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
