// carComp.js
import React from "react";
import styles from "./carCompStyle.module.css";
import { useNavigate } from "react-router-dom";

const CarComp = ({ carListings }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.carCardWrapper}>
        {carListings.length > 0 ? (
          carListings.map((car, index) => (
            <div
              className={styles.cardDetail}
              key={index}
              onClick={() => navigate(`/inventory/car/${car.id}`)} // Navigate to the specific car page
            >
              <img src={car.images[0]} alt={`${car.make} ${car.model}`} />
              <h2 className={styles.cardHeader}>
                {car.year} {car.make} {car.model}
                <br /> <span>{car.trim}</span>
              </h2>

              <div className={styles.priceWrapper}>
                <p className={styles.stock}>
                  Stock #:<span> {car.stock || 'N/A'}</span>
                </p>
                <p className={styles.carCardPrice}>${car.price}</p>
              </div>

              <p className={styles.autoSales}>Greenfield Auto Center</p>

              <div className={styles.carSpecsWrapper}>
                <div className={styles.carSpecsTextWrapper}>
                  <p>Mileage:</p>
                  <p>{car.mileage}</p>
                </div>
                <div className={styles.carSpecsTextWrapper}>
                  <p>Fuel:</p>
                  <p>{car.fuelType || 'N/A'}</p>
                </div>
                <div className={styles.carSpecsTextWrapper}>
                  <p>Exterior:</p>
                  <p>{car.color || 'N/A'}</p>
                </div>
                <div className={styles.carSpecsTextWrapper}>
                  <p>Interior:</p>
                  <p>{car.interior || 'N/A'}</p>
                </div>
                <div className={styles.carSpecsTextWrapper}>
                  <p>DriveTrain:</p>
                  <p>{car.drivetrain || 'N/A'}</p>
                </div>
                <div className={styles.carSpecsTextWrapper}>
                  <p>Transmission:</p>
                  <p>{car.transmission || 'AUTO'}</p>
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

