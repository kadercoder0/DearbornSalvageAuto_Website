import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const ImageCarousel = ({ carImages }) => {
  const containerStyle = {
    width: '200%',
    maxWidth: '900px',
    margin: 'auto',
    right: '500px',
    position: 'relative',
  };

  const imageStyle = {
    height: '500px',
    minHeight: '300px',  // Ensure consistent height for images
    width: '900px',
    //objectFit: 'contain',
    transition: 'opacity 0.5s ease-in-out',
  };

  return (
    <div style={containerStyle}>
    <Carousel interval={null} slide={false}> {/* Disable slide animation */}
        {carImages.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block"
              src={image}
              alt={`Car image ${index + 1}`}
              style={imageStyle}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
