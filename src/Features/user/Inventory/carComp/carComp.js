import React from "react";
import Carousel from "react-bootstrap/Carousel"; // Import the Bootstrap carousel
import styles from "../carComp/carCompStyle.module.css";
import { useNavigate } from "react-router-dom";

const CarComp = ({ carListings }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    // This will prevent navigation when clicking on the carousel controls
    e.stopPropagation();
  };

  return (
    <div>
      <div className={styles.carCardWrapper}>
        {carListings.length > 0 ? (
          carListings.map((car, index) => (
            <div
              className={styles.cardDetail}
              key={index}
              onClick={() => navigate(`/inventory/car/${car.id}`)} // Navigate to single car page
            >
              {/* Carousel inside each car card */}
              <Carousel
                interval={null}
                slide={false}
                className={styles.cardCarousel}
                onClick={handleClick} // Prevent propagation when clicking on the carousel
              >
                {car.images.map((image, imgIndex) => (
                  <Carousel.Item key={imgIndex}>
                    <img
                      src={image}
                      alt={`${car.make} ${car.model} image ${imgIndex + 1}`}
                      className={styles.carouselImage}
                      onClick={handleClick} // Ensure clicks on the image don't navigate away
                    />
                  </Carousel.Item>
                ))}
              </Carousel>

              <div className={styles.cardContent}>
                <h2 className={styles.cardHeader}>
                  {car.year} {car.make} {car.model}
                  <br /> <span>{car.trim}</span>
                </h2>

                <div className={styles.infoWrapper}>
                  <div className={styles.milesWrapper}>
                    <p className={styles.carCardMiles}>
                      {Number(car.odometer).toLocaleString()} miles
                    </p>
                  </div>
                  <div className={styles.priceWrapper}>
                    <p className={styles.carCardPrice}>
                      ${Number(car.price).toLocaleString()}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <p>No cars available matching the current filters.</p>
        )}
      </div>
    </div>
  );
};

export default CarComp;
